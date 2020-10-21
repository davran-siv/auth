import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string
}
