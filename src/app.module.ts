import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import typeormConfigAsync from '../ormconfig-async'
import { ApiModule } from './api/api.module'
import { UserDomainModule } from './domains/user/user.domain-module'
import { WebhookDomainModule } from './domains/webhook/webhook.domain-module'
import { UserImplModule } from './impl/user/user.impl-module'
import { RpcModule } from './rpc/rpc.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeormConfigAsync,
    }),
    ApiModule,
    UserImplModule,
    UserDomainModule,
    WebhookDomainModule,
    RpcModule,
  ],
  providers: [],
})
export class AppModule {}
