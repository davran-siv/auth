import { BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { WebhookActionType } from './webhook.interface'

@Entity('webhook')
export class WebhookEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  actionType: WebhookActionType

  @Column()
  url: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date | null

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date()
  }
}
