import { PrimaryIdentityProvider } from '../../consts/user.enums'

export class UserDto {
  id: string
  firstName: string | null
  lastName: string | null
  email: string
  lastLogin: Date | null
  primaryIdentityProvider: PrimaryIdentityProvider
  createdAt: Date
  updatedAt: Date | null
}

export class UserWithPasswordDto extends UserDto {
  password: string
}
