import { Provider } from '@nestjs/common';
import { GetExampleHandler } from '@lib/core/example/battle/application-module/queries/handlers/get-example.handler';

export const QueryHandlers: Provider[] = [GetExampleHandler];
