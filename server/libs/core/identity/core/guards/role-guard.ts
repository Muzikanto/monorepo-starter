import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IRequest } from '@lib/utils';

@Injectable()
export class RoleGuard implements CanActivate {
  private reflector: Reflector;

  constructor(reflector: Reflector) {
    this.reflector = reflector;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<IRequest>();
    const userAuth = request.user;

    if (!userAuth) {
      return false;
    }

    return this.matchRoles(roles, userAuth.entity.role as string);
  }

  protected matchRoles(roles: string[], role: string): boolean {
    return roles.includes(role);
  }
}
