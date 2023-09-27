import { DomainBase } from '@lib/utils';
import { BadRequestException } from '@nestjs/common';
import { ExampleCreatedEvent, IExample } from '@lib/core/example/battle/domain';

export class Example extends DomainBase {
  constructor(public readonly entity: IExample) {
    super();
  }

  // ============= MAIN Methods =============

  public update(value: number): void {
    // update field
  }

  // ============= Asserts =============

  public assertCheck(): void {
    if (!this.entity) {
      throw new BadRequestException('test');
    }
  }

  // ============= Events =============

  public onCreate(): void {
    this.apply(new ExampleCreatedEvent({ id: this.id }));
  }

  // getters

  get id() {
    return this.entity.id;
  }
}
