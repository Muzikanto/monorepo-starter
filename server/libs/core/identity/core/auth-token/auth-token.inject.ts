import { Inject } from '@nestjs/common';

export const USER_AUTH_TOKEN_OPTIONS_KEY = 'USER_AUTH_TOKEN_OPTIONS';
export const InjectUserAuthTokenOptions = () => Inject(USER_AUTH_TOKEN_OPTIONS_KEY);
