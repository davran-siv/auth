import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsDefined, IsOptional, IsString } from 'class-validator'
import { PrimaryIdentityProvider } from '../../consts/user.enums'
import { UserDto } from '../../domains/user/user.dto'
import { isArray } from '../../utils'

export class UserCreateRequestMapper {
  @IsString()
  @IsDefined()
  @ApiProperty()
  email: string

  @IsString()
  @IsDefined()
  @ApiProperty()
  password: string

  @IsString()
  @IsDefined()
  @ApiProperty()
  passwordConfirmation: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  firstName?: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  lastName?: string
}

export class UserUpdateRequestMapper {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  email?: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  firstName?: string

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  lastName?: string
}

export class UserResponseMapper {
  @ApiProperty()
  id: string

  @ApiProperty()
  email: string

  @ApiProperty({ nullable: true })
  firstName: string | null

  @ApiProperty({ nullable: true })
  lastName: string | null

  @ApiProperty({ nullable: true })
  lastLogin: Date | null

  @ApiProperty({ enum: PrimaryIdentityProvider })
  primaryIdentityProvider: PrimaryIdentityProvider

  constructor(entity: UserDto) {
    this.id = entity.id
    this.email = entity.email
    this.firstName = entity.firstName
    this.lastName = entity.lastName
    this.lastLogin = entity.lastLogin
    this.primaryIdentityProvider = entity.primaryIdentityProvider
  }

  static of(entity: UserDto): UserResponseMapper
  static of(entity: UserDto[]): UserResponseMapper[]
  static of(entity: UserDto | UserDto[]): UserResponseMapper | UserResponseMapper[] {
    return isArray(entity)
      ? entity.map((it) => it && new UserResponseMapper(it))
      : entity && new UserResponseMapper(entity)
  }
}
