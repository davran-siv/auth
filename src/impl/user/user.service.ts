import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { UserEntity } from './user.entity'
import { UserCreate } from './user.interface'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async createOne(dto: UserCreate, entityManager: EntityManager): Promise<UserEntity> {
    return this.userRepository.createOrUpdateOne(dto, entityManager)
  }

  findOneById(id: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneById(id)
  }
}
