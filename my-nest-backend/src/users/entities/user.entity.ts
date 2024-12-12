import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  username: string;

  @Column({ select : false })
  password: string;

  @Column({nullable: true})
  age: number;
}

export type UserWithoutPassword = Omit<User, 'password'>;