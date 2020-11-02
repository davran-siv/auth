import { Injectable, NotFoundException } from '@nestjs/common'
import { Connection, EntityManager } from 'typeorm'
import { UserCreateRequestMapper } from '../../api/user/user.mapper'
import { httpExceptionMessages } from '../../consts/httpExceptionMessages'
import { UserService } from '../../impl/user/user.service'
import { UserPublisher } from '../../rpc/user/user.publisher'
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
    private userPublisher: UserPublisher
  ) {}

  async createOne(dto: UserCreateRequestMapper, entityManager?: EntityManager): Promise<UserDto> {
    const mock = {
      id: "adwawd",
      email: "awd",
      firstName: "dd",
      lastName: "dd"
    }
    const { manager, queryRunner } = await startTransaction(this.connection, entityManager)
    try {
      // const createdUser = await this.usersService.createOne(dto, manager)
      await commitTransaction(queryRunner)
      await this.userPublisher.publishUserCreatedMessage({id: mock.id})
      // return mock as UserDto
      return this.getOneById('awd')
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
