import { Hears, Message, On, Sender, Start, Update } from 'nestjs-telegraf';

@Update()
class TelegramService {
  @Start()
  async onStart(): Promise<string> {
    return 'Hello';
  }

  @Hears(['hi', 'hello', 'hey', 'qq'])
  onGreetings(@Sender('first_name') firstName: string): string {
    return `Hey ${firstName}`;
  }

  @On('text')
  onMessage(@Message('text') text: string): string {
    return `Text: ${text}`;
  }
}

export default TelegramService;
