import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UserDomain } from '../../domains/user/user.domain'
import { MyLogger } from '../../shared/logger/logger.service'
import { UserCreateRequestMapper, UserResponseMapper } from './user.mapper'

@Controller('users')
export class UserController {
  constructor(
    private usersDomain: UserDomain,
    private myLogger: MyLogger
  ) {
    this.myLogger.setContext('UserController');
  }

  @Post()
  async createOne(@Body() dto: UserCreateRequestMapper): Promise<UserResponseMapper> {
    const response = await this.usersDomain.createOne(dto)
    return UserResponseMapper.of(response)
  }

  @Get(':id')
  async getOneById(@Param() id: string): Promise<UserResponseMapper> {
    const response = await this.usersDomain.getOneById(id)
    return UserResponseMapper.of(response)
  }
}
