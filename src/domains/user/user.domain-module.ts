import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserImplModule } from '../../impl/user/user.impl-module'
import { UserConsumer } from '../../rpc/user/user.consumer'
import { UserRpcModule } from '../../rpc/user/user.rpc-module'
import { UserDomain } from './user.domain'

@Module({
  imports: [
    TypeOrmModule,
    UserImplModule,
    UserRpcModule,
  ],
  providers: [
    UserDomain,
    UserConsumer,
  ],
  exports: [UserDomainModule, UserDomain],
})
export class UserDomainModule {}
