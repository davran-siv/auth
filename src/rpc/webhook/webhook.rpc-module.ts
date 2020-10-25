import { Module } from '@nestjs/common'
import { WebhookDomainModule } from '../../domains/webhook/webhook.domain-module'
import { WebhookConsumer } from './webhook.consumer'

@Module({
  imports: [
    WebhookDomainModule
  ],
  providers: [
    WebhookConsumer,
  ],
  exports: [WebhookRpcModule],
})
export class WebhookRpcModule {}
