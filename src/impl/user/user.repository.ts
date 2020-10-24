import { EntityRepository } from 'typeorm'
import { UserEntity } from './user.entity'
import { BaseRepository } from '../../shared/repository/base-repository'

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
  findOneById(id: string): Promise<UserEntity | undefined> {
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
