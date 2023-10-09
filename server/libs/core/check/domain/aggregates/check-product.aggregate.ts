import { DomainBase } from '@lib/utils';
import { BadRequestException } from '@nestjs/common';
import { ICheckProduct } from '@lib/core/check/domain';

export class CheckProduct extends DomainBase {
  constructor(public readonly entity: ICheckProduct) {
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

  // getters

  get id() {
    return this.entity.id;
  }
}
