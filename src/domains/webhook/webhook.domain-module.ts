import { Module } from '@nestjs/common'
import { WebhookDomain } from './webhook.domain'

@Module({
  imports: [],
  providers: [
    WebhookDomain,
  ],
  exports: [WebhookDomainModule, WebhookDomain],
})
export class WebhookDomainModule {}
