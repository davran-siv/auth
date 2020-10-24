import { Injectable, NotFoundException } from '@nestjs/common'
import { Connection, EntityManager } from 'typeorm'
import { UserCreateRequestMapper } from '../../api/user/user.mapper'
import { httpExceptionMessages } from '../../consts/httpExceptionMessages'
import { UserEntity } from '../../impl/user/user.entity'
import { UserService } from '../../impl/user/user.service'
import {
  commitTransaction,
  releaseTransaction,
  rollbackTransactionAndThrowError,
  startTransaction,
} from '../../shared/repository/transaction'
import { UserDto } from './user.dto'

@Injectable()
export class UserDomain {
  constructor(
    private usersService: UserService,
    private connection: Connection,
  ) {}

  async createOne(dto: UserCreateRequestMapper, entityManager?: EntityManager): Promise<UserDto> {
    const { manager, queryRunner } = await startTransaction(this.connection, entityManager)
    try {
      const createdUser = await this.usersService.createOne(dto, manager)
      await commitTransaction(queryRunner)
      return this.getOneById(createdUser.id)
    } catch (err) {
      return await rollbackTransactionAndThrowError(queryRunner, err)
    } finally {
      await releaseTransaction(queryRunner)
    }
  }

  async getOneById(id: string): Promise<UserDto> {
    const user = await this.usersService.findOneById(id)
    if (!user) {
      throw new NotFoundException(httpExceptionMessages.user.notFoundById)
    }
    return user
  }
}
