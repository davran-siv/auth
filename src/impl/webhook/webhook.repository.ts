import { EntityRepository } from 'typeorm'
import { BaseRepository } from '../../shared/repository/base-repository'
import { WebhookEntity } from './webhook.entity'

@EntityRepository(WebhookEntity)
export class WebhookRepository extends BaseRepository<WebhookEntity>{}
