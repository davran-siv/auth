import { BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { PrimaryIdentityProvider } from '../../consts/user.enums'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ nullable: true })
  firstName: string | null

  @Column({ nullable: true })
  lastName: string | null

  @Column()
  email: string

  @Column({ nullable: true })
  lastLogin: Date | null

  @Column()
  primaryIdentityProvider: PrimaryIdentityProvider

  @Column({ nullable: true, select: false })
  password: string | null

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date | null

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date()
  }
}
