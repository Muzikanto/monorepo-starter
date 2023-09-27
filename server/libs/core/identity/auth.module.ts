import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PASSPORT_STRATEGIES } from './core/passport';
import { AuthConfig } from './auth.config';

@Module({
  imports: [PassportModule],
  providers: [AuthConfig, ...PASSPORT_STRATEGIES],
  exports: [],
})
export class AuthModule {}
