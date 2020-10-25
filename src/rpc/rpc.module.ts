import { Module } from '@nestjs/common'
import { MailerRpcModule } from './mailer/mailer.rpc-module'
import { UserRpcModule } from './user/user.rpc-module'
import { WebhookRpcModule } from './webhook/webhook.rpc-module'

@Module({
  imports: [
    MailerRpcModule,
    UserRpcModule,
    WebhookRpcModule,
  ],
  exports: [RpcModule],
})
export class RpcModule {}
