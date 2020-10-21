import { Controller, Post } from '@nestjs/common';
import { UsersDomain } from '../../domains/users/users.domain';

@Controller('users')
export class UsersController {
  constructor(
    private usersDomain: UsersDomain
  ) {}

  @Post()
  createOne(): Promise<any> {
    return this.usersDomain.createOne()
  }
}
