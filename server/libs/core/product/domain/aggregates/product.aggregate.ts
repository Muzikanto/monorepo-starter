import { DomainBase } from '@lib/utils';
import { BadRequestException } from '@nestjs/common';
import { IProduct } from '@lib/core/product/domain';

export class Product extends DomainBase {
  constructor(public readonly entity: IProduct) {
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
