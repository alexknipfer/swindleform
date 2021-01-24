import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { name: 'username', unique: true })
  username: string;

  @Column('text', { name: 'password_hash' })
  passwordHash: string;
}
