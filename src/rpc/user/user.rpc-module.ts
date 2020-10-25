import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { Module } from '@nestjs/common'
import { UserConsumer } from './user.consumer'
import { UserPublisher } from './user.publisher'

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'user',
          type: 'topic',
        },
      ],
      uri: 'amqp://root:root@localhost:5672',
    }),
  ],
  providers: [
    UserConsumer,
    UserPublisher,
  ],
  exports: [UserRpcModule, UserPublisher],
})
export class UserRpcModule {}
