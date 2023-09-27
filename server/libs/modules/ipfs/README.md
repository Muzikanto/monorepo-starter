<h1>Использование Ipfs (NestJS)</h1>

### Описание
Модуль для взаимодействия с IPFS, загрузка файла, скачивание файла.

Импорт модуля IpfsModule

```ts
@Module({
  imports: [
    IpfsModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): IIpfsConfig => {
        return {...}
      }
    })
  ]
})
export class AppModule {}
```

Интерфейс конфига:

```typescript
interface IIpfsConfig {
  url: string;
}
```
