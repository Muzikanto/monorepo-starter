import { Example } from '@lib/core/example/battle/domain';
import { ExampleEntity } from '@lib/core/example/battle/db-adapter';

export function getExampleFixture(): Example {
  return new Example(new ExampleEntity({}));
}
