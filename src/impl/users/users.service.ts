import { Injectable } from '@nestjs/common';
import { UsersCreateRequestDto } from './users.dto';
import { UsersEntity } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UsersRepository
  ) {}

  createOne(dto: UsersCreateRequestDto): Promise<UsersEntity> {
    return this.userRepository.createOrUpdateOne(dto)
  }

}
