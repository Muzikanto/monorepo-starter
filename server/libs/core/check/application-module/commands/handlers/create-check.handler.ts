import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCheckCommand } from '@lib/core/check/application-module/commands/impl';
import { ProductRepository } from '@lib/core/product/infrastructure-module';
import { ProductEntity } from '@lib/core/product/db-adapter';
import { ShopProductRepository, ShopRepository } from '@lib/core/shop/infrastructure-module';
import axios from 'axios';
import { IFnsCheck, IFnsCheckItem } from '@lib/core/check/application-module/commands/types/check-fns.types';
import { Product } from '@lib/core/product/domain';
import { Shop, ShopProduct } from '@lib/core/shop/domain';
import { ShopEntity, ShopProductEntity } from '@lib/core/shop/db-adapter';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CheckProductRepository, CheckRepository } from '@lib/core/check/infrastructure-module';
import { CheckEntity, CheckProductEntity } from '@lib/core/check/db-adapter';
import { AppConfig } from '@lib/config';
import md5 from 'md5';
import fs from 'fs';
import path from 'path';
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
    // await this.dataSource.query(['check', 'check_product', 'product', 'shop', 'shop_product'].map(el => `truncate main.${el};`).join('\n'));
    const fnsCheck = await this.getCheckInfoFromFile(payload.code);
    const shopId = md5(fnsCheck.user);
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
      const productId = this.getCheckItemId(checkItem);
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
    const res = await axios.post(
      'https://proverkacheka.com/api/v1/check/get',
      `${code}&token=${this.appConfig.fnsToken}`
    );

    if (res.data.code !== 1) {
      throw new BadRequestException(res.data.data);
    }

    return this.deduplicate(res.data.data.json || res.data.json);
  }

  protected async getCheckInfoFromFile(code: string): Promise<IFnsCheck> {
    const raw = fs.readFileSync(path.resolve('..', 'test-data', code + '.json'), { encoding: 'utf-8' });

    return this.deduplicate(JSON.parse(raw).data.json);
  }

  protected deduplicate(data: IFnsCheck): IFnsCheck {
    const itemsMap = data.items.reduce((acc, el) => {
      const productId = this.getCheckItemId(el);

      let result: IFnsCheckItem | undefined = acc[productId];

      if (!result) {
        result = el;
      } else {
        result.sum += el.sum;
        result.quantity += el.quantity;
      }

      return {
        ...acc,
        [productId]: result,
      };
    }, {});

    return { ...data, items: Object.values(itemsMap) };
  }

  protected getCheckItemId(item: IFnsCheckItem): string {
    if (!item.productCodeNew) {
      return item.name;
    }

    const productCodeStandard = Object.keys(item.productCodeNew)[0];
    const productId = item.productCodeNew[productCodeStandard].gtin;

    return productId;
  }
}
