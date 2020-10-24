import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfigAsync from '../ormconfig-async';
import { ApiModule } from './api/api.module'
import { domains } from './domains';
import { UserModule } from './impl/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeormConfigAsync,

    }),
    ApiModule,
    UserModule,
  ],
  providers: [
    ...domains,
  ],
})
export class AppModule {}
