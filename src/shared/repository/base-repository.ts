import { DeepPartial, DeleteResult, EntityManager, EntitySchema, ObjectType, Repository } from 'typeorm'
import { isArray, validateRecordExistence } from '../../utils';

export abstract class BaseRepository<Entity> extends Repository<Entity> {
  createOrUpdateOne(entityLike: DeepPartial<Entity>, entityManager?: EntityManager): Promise<Entity> {
    const entity = this.create(entityLike)
    return entityManager ? entityManager.save(entity) : this.save(entity)
  }

  createOrUpdateMany(entityLikes: DeepPartial<Entity>[], entityManager?: EntityManager): Promise<Entity[]> {
    const entities = entityLikes.map(it => this.create(it))
    return entityManager ? entityManager.save(entities) : this.save(entities)
  }

  async deleteById(criteria: number | number[], targetOrEntity?: ObjectType<Entity> | EntitySchema<Entity> | string, entityManager?: EntityManager): Promise<DeleteResult> {
    if (isArray(criteria) && !criteria.length) {
      return {
        raw: '',
        affected: 0,
      }
    }
    return entityManager && targetOrEntity
      ? entityManager.delete(targetOrEntity, criteria)
      : this.delete(criteria)
  }

  async throwErrorIfNotAllIdsFound(ids: number | number[], errorTemplate: string): Promise<void> {
    const toCheck = isArray(ids) ? ids : [ids]
    if (!toCheck.length) {
      return
    }
    const found = await this.createQueryBuilder().andWhereInIds(toCheck).select('id').getRawMany()

    validateRecordExistence(
      toCheck,
      found,
      errorTemplate,
    )
  }
}
