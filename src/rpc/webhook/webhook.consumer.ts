import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'
import { WebhookDomain } from '../../domains/webhook/webhook.domain'
import { UserCreatedRpcMessage } from '../user/user.message'

@Injectable()
export class WebhookConsumer {
  constructor(
    private webhookDomain: WebhookDomain,
  ) {}

  @RabbitRPC({
    exchange: 'user',
    routingKey: 'user-created',
    queue: 'webhook',
  })
  async userCreatedHandler(msg: UserCreatedRpcMessage) {
    try {
      await this.webhookDomain.send()
      return {
        response: 42,
      }
    } catch (e) {
      return new Nack(true)
    }


  }
}
