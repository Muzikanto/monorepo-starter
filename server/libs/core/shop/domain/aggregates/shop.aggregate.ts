import { DomainBase } from '@lib/utils';
import { BadRequestException } from '@nestjs/common';
import { IShop } from '@lib/core/shop/domain';

export class Shop extends DomainBase {
  constructor(public readonly entity: IShop) {
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
