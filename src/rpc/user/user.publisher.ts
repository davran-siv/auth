import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'
import { UserCreatedRpcMessage } from './user.message'

@Injectable()
export class UserPublisher {
  constructor(
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async publishUserCreatedMessage(dto: UserCreatedRpcMessage): Promise<void> {
    await this.amqpConnection.publish(
      'user',
      'user-created',
      dto,
    )
  }
}
