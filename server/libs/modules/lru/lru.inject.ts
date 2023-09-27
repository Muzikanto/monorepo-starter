import { Inject } from '@nestjs/common';

export const LRU_OPTIONS_KEY = (name: string) => `LRU_OPTIONS:${name}`;
export const InjectLruOptions = (name: string): ParameterDecorator => Inject(LRU_OPTIONS_KEY(name));

export const LRU_CLIENT_KEY = (name: string) => `LRU_CLIENT:${name}`;
export const InjectLruClient = (name: string): ParameterDecorator => Inject(LRU_CLIENT_KEY(name));
