import { EntityRepository } from 'typeorm'
import { BaseRepository } from '../../shared/repository/base-repository'
import { UserEntity } from './user.entity'

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  async findOneById(id: string): Promise<UserEntity | undefined> {
    return this.createQueryBuilder('user')
               .where('user.id = :id', { id })
               .getOne()
  }

  findOneByIdWithPassword(id: string): Promise<UserEntity | undefined> {
    return this.createQueryBuilder('user')
               .select('user.password')
               .where('user.id = :id', { id })
               .getOne()
  }
}
