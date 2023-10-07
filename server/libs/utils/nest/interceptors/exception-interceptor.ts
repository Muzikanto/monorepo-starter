import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Inject,
  Injectable,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { Logger } from '@lib/modules';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  constructor(@Logger() protected readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<object> {
    return next.handle().pipe(
      catchError((err) => {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (user) {
          if (!err.extra) {
            err.extra = {};
          }

          err.extra.user = user.entity.id;
        }

        // this.logger.captureException(err, { sentry: err.status >= 500 });

        return throwError(() => {
          return new HttpException(
            {
              statusCode: err.response?.statusCode || err.status || 500,
              errorCode: err.response?.errorCode,
              message: err.response?.message || err.message || 'Something went wrong',
              stack: err.response?.error || err.stack,
              query: request.query,
              body: request.body,
              params: request.params,
              path: request.routerPath,
            },
            err.response?.statusCode || 500
          );
        });
      })
    );
  }
}
