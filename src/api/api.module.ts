import { Module } from '@nestjs/common'
import { UserDomainModule } from '../domains/user/user.domain-module'
import { WebhookDomainModule } from '../domains/webhook/webhook.domain-module'
import { UserController } from './user/user.controller'
import { WebhookController } from './webhook/webhook.controller'

@Module({
  imports: [
    UserDomainModule,
    WebhookDomainModule,
  ],
  controllers: [
    UserController,
    WebhookController,
  ],
})
export class ApiModule {}
