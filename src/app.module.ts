import { Module } from '@nestjs/common';
import { controllers } from './controllers';
import { domains } from './domains';
import { UsersModule } from './impl/users/users.module';

@Module({
  imports: [
    UsersModule,
  ],
  controllers: [
    ...controllers,
  ],
  providers: [
    ...domains,
  ],
})
export class AppModule {}
