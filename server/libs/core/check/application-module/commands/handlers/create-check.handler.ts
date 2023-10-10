import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCheckCommand } from '@lib/core/check/application-module/commands/impl';
import { ProductRepository } from '@lib/core/product/infrastructure-module';
import { ProductEntity } from '@lib/core/product/db-adapter';
import { ShopProductRepository, ShopRepository } from '@lib/core/shop/infrastructure-module';
import axios from 'axios';
import { IFnsCheck } from '@lib/core/check/application-module/commands/types/check-fns.types';
import { Product } from '@lib/core/product/domain';
import { Shop, ShopProduct } from '@lib/core/shop/domain';
import { ShopEntity, ShopProductEntity } from '@lib/core/shop/db-adapter';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CheckProductRepository, CheckRepository } from '@lib/core/check/infrastructure-module';
import { CheckEntity, CheckProductEntity } from '@lib/core/check/db-adapter';
import { AppConfig } from '@lib/config';
import md5 from 'md5';
import { BadRequestException } from '@nestjs/common';
import { CheckProduct } from '@lib/core/check/domain';

@CommandHandler(CreateCheckCommand)
export class CreateCheckCommandHandler implements ICommandHandler<CreateCheckCommand> {
  constructor(
    @InjectDataSource() protected readonly dataSource: DataSource,
    protected readonly appConfig: AppConfig,
    //
    protected readonly productRepository: ProductRepository,
    protected readonly shopProductRepository: ShopProductRepository,
    protected readonly shopRepository: ShopRepository,
    protected readonly checkProductRepository: CheckProductRepository,
    protected readonly checkRepository: CheckRepository
  ) {
    //
  }

  async execute({ payload }: CreateCheckCommand): Promise<void> {
    const fnsCheck = await this.getCheckInfo(payload.code);
    const shopId = fnsCheck.metadata.id.toString();
    const checkId = md5(payload.code);

    const checkExists = await this.checkRepository.get(checkId);

    if (checkExists) {
      throw new BadRequestException('check already exists');
    }

    // logic
    const checkProducts: CheckProduct[] = [];
    const products: Product[] = [];
    const shopProducts: ShopProduct[] = [];
    let shop: Shop | null = await this.shopRepository.get(shopId);
    const check = this.checkRepository.toDomain(
      new CheckEntity({
        id: md5(payload.code),
        code: payload.code,
        userId: '_',
      })
    );

    if (!shop) {
      shop = this.shopRepository.toDomain(
        new ShopEntity({
          id: shopId,
          title: fnsCheck.user,
          address: fnsCheck.retailPlaceAddress,
        })
      );
    } else {
      shop = null;
    }

    for (const checkItem of fnsCheck.items) {
     if (!checkItem.productCodeNew) {
        continue;
     }

      const productCodeStandard = Object.keys(checkItem.productCodeNew)[0];
      const productId = checkItem.productCodeNew[productCodeStandard].rawProductCode;
      const shopProductId = md5(`${shopId}-${productId}`);

      const checkProduct = this.checkProductRepository.toDomain(
        new CheckProductEntity({
          checkId,
          shopId,
          shopProductId,
          productId,
          userId: '_',
          amount: checkItem.quantity,
          minPrice: checkItem.price,
          price: checkItem.price,
        })
      );
      const product = this.productRepository.toDomain(new ProductEntity({ id: productId, name: checkItem.name }));
      const shopProduct = this.shopProductRepository.toDomain(
        new ShopProductEntity({
          id: shopProductId,
          productId,
          shopId,
          price: checkItem.price,
        })
      );

      products.push(product);
      shopProducts.push(shopProduct);
      checkProducts.push(checkProduct);
    }

    // save
    await this.dataSource.transaction(async (manager) => {
      await this.productRepository.saveMany(products, { manager });
      await this.shopProductRepository.saveMany(shopProducts, { manager });

      await this.checkRepository.save(check, { manager });
      await this.checkProductRepository.saveMany(checkProducts, { manager });

      if (shop) {
        await this.shopRepository.save(shop, { manager });
      }
    });

    // commit
    products.forEach((product) => product.commit());
  }

  protected async getCheckInfo(code: string): Promise<IFnsCheck> {
    const res = await axios.post('https://proverkacheka.com/api/v1/check/get', `${code}&token=${this.appConfig.fnsToken}`);

    if (res.data.code !== 1) {
        throw new BadRequestException(res.data.data);
    }

    return res.data.data.json || res.data.json;
  }
}
