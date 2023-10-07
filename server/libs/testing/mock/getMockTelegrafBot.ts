import { Telegraf } from 'telegraf';
import { noop } from '@lib/utils';

export const getMockTelegrafBot = () => {
  const bot = new Telegraf('test');
  bot.stop = noop;
  bot.telegram.sendMessage = () => Promise.resolve({} as any);
  return bot;
};
