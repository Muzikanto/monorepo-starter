import { Inject } from '@nestjs/common';

export const TELEGRAM_OPTIONS_KEY = (name = 'default') => `TELEGRAM_OPTIONS_KEY:${name}`;
export const InjectTelegramOptions = (name = 'default'): ParameterDecorator => Inject(TELEGRAM_OPTIONS_KEY(name));

export const TELEGRAM_CLIENT_KEY = (name = 'default') => `TELEGRAM_CLIENT_KEY:${name}`;
export const InjectTelegramClient = (name = 'default'): ParameterDecorator => Inject(TELEGRAM_CLIENT_KEY(name));
