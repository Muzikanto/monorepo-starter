import { Provider } from '@nestjs/common';
import { GetCheckQueryHandler } from '@lib/core/check/application-module/queries/handlers/get-check.handler';
import { FindChecksQueryHandler } from '@lib/core/check/application-module/queries/handlers/find-checks.handler';

export const QueryHandlers: Provider[] = [GetCheckQueryHandler, FindChecksQueryHandler];
