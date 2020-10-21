import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfigAsync from '../ormconfig-async';
import { controllers } from './controllers';
import { domains } from './domains';
import { UsersModule } from './impl/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeormConfigAsync,
    }),

    UsersModule,
  ],
  controllers: [
    ...controllers,
  ],
  providers: [
    ...domains,
  ],
})
export class AppModule {}
