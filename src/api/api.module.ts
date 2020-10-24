import { Module } from '@nestjs/common'
import { UserController } from './user/user.controller'
import { WebhookController } from './webhook/webhook.controller'

@Module({
  controllers: [
    UserController,
    WebhookController,
  ],
})
export class ApiModule {}
