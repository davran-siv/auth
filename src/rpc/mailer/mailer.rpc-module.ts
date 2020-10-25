import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { Module } from '@nestjs/common'
import { MailerConsumer } from './mailer.consumer'

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'mailer',
          type: 'topic',
        },
      ],
      uri: 'amqp://root:root@localhost:5672',
    }),
  ],
  providers: [MailerConsumer]
})
export class MailerRpcModule {}
