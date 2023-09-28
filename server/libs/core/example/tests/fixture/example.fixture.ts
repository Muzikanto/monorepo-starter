import { Example } from '@lib/core/example/domain';
import { ExampleEntity } from '@lib/core/example/db-adapter';

export function getExampleFixture(): Example {
  return new Example(new ExampleEntity({}));
}
