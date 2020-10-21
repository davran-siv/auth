import { Injectable } from '@nestjs/common';
import { UsersService } from '../../impl/users/users.service';

@Injectable()
export class UsersDomain {
  constructor(
    private usersService: UsersService,
  ) {}

  async createOne(): Promise<any> {
    const createdUser = await this.usersService.createOne({ name: '' });
  }
}
