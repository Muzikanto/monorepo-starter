import { ITestingApplication } from '@lib/testing/types';
import { IExampleDto } from '@lib/core/example/battle/domain';
import { IGetExampleDto } from '@lib/core/example/battle/application-module/queries/types/index.dto.types';

export async function testingGetExample(app: ITestingApplication, opts: { exampleId: string }): Promise<IExampleDto> {
  const result = await app.injectGet<IGetExampleDto, IExampleDto>({
    url: '/example',
    args: { exampleId: opts.exampleId },
  });

  expect(result.status).toBe(200);

  return result.data;
}
