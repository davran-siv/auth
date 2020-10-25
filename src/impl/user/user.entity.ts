import { BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { PrimaryIdentityProvider } from '../../consts/user.enums'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ nullable: true, name: 'first_name', type: 'varchar' })
  firstName: string | null

  @Column({ nullable: true, type: 'varchar' })
  lastName: string | null

  @Column()
  email: string

  @Column({ nullable: true, type: 'timestamp with time zone' })
  lastLogin: Date | null

  @Column()
  primaryIdentityProvider: PrimaryIdentityProvider

  @Column({ nullable: true, select: false, type: 'varchar' })
  password: string | null

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at', nullable: true })
  updatedAt: Date | null

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date()
  }
}
