import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const wsCors: CorsOptions = {
  origin: (origin: string, callback: (err: Error | null, success: boolean) => void) => {
    callback(null, true);
  },
  allowedHeaders: ['authorization'],
  // credentials: true
};
