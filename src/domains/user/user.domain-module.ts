import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserImplModule } from '../../impl/user/user.impl-module'
import { UserDomain } from './user.domain'

@Module({
  imports: [
    TypeOrmModule,
    UserImplModule,
  ],
  providers: [
    UserDomain,
  ],
  exports: [UserDomainModule, UserDomain],
})
export class UserDomainModule {}
