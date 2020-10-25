import { RabbitRPC } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'
import { UserCreatedRpcMessage } from '../user/user.message'

@Injectable()
export class MailerConsumer {
  @RabbitRPC({
    exchange: 'user',
    routingKey: 'user-created',
    queue: 'mailer',
  })
  userCreatedHandler(msg: UserCreatedRpcMessage) {
    console.log('MailerConsumer => ', msg)
    return {
      response: 42,
    }
  }
}
