import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { IRequest } from '@lib/utils';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, object> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<object> {
    const req = context.switchToHttp().getRequest<IRequest>();

    if (req.url === '/api/metrics') {
      return next.handle();
    }

    const startedAt = new Date().getTime();

    return next.handle().pipe(
      map((data: unknown) => {
        const res = context.switchToHttp().getResponse();
        const endedAt = new Date().getTime();

        return {
          statusCode: res.statusCode,
          data,
          service: {
            startedAt: startedAt,
            serverTime: endedAt,
            duration: endedAt - startedAt,
          },
          info: {
            // eslint-disable-next-line
            ...(req.userInfo || {}),
          },
        };
      })
    );
  }
}
