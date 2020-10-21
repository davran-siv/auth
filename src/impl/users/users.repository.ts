import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../shared/repository/base-repository';
import { UsersEntity } from './users.entity';

@EntityRepository(UsersEntity)
export class UsersRepository extends BaseRepository<UsersEntity> {

}
