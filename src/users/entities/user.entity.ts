import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    unique: true,
  })
  @Index()
  username: string;

  @Column({
    nullable: false,
  })
  hashedPassword: string;

  @CreateDateColumn()
  createdDate: Date;
}
