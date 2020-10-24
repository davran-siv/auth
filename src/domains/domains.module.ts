import { Module } from '@nestjs/common'
import { UserDomain } from './user/user.domain'

@Module({
  providers: [
    UserDomain
  ]
})
export class DomainsModule{}
