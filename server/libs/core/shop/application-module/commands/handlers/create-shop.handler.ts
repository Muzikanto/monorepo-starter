import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateShopCommand } from '@lib/core/shop/application-module/commands/impl';
import { ShopRepository } from '@lib/core/shop/infrastructure-module';
import { Shop } from '@lib/core/shop/domain';
import { ShopEntity } from '@lib/core/shop/db-adapter';

@CommandHandler(CreateShopCommand)
export class CreateShopCommandHandler implements ICommandHandler<CreateShopCommand> {
  constructor(protected readonly shopRepository: ShopRepository) {
    //
  }

  async execute({ payload }: CreateShopCommand): Promise<Shop> {
    const shop = this.shopRepository.toDomain(
      new ShopEntity({ id: '_', title: payload.title, address: payload.address })
    );

    // save
    await this.shopRepository.save(shop);

    // commit
    shop.commit();

    return shop;
  }
}
