import { Inject } from '@nestjs/common';

export const LOGGER_CONFIG_KEY = 'logger-config-key';
export const InjectLoggerConfig = (): ParameterDecorator => Inject(LOGGER_CONFIG_KEY);

export const LOGGER_SENTRY_KEY = 'logger-sentry-key';
export const InjectSentry = (): ParameterDecorator => Inject(LOGGER_SENTRY_KEY);
