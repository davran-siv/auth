import { Injectable } from '@nestjs/common'
import { WebhookEntity } from './webhook.entity'
import { WebhookCreate } from './webhook.interface'
import { WebhookRepository } from './webhook.repository'

@Injectable()
export class WebhookService {
  constructor(
    private repository: WebhookRepository,
  ) {}

  createOne(dto: WebhookCreate): Promise<WebhookEntity> {
    return this.repository.createOrUpdateOne(dto)
  }

  updateOne(id: string, dto: WebhookCreate): Promise<WebhookEntity> {
    return this.repository.createOrUpdateOne({
      id,
      ...dto,
    })
  }
}
