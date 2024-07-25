import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Link } from '../../links/entities/link.entity';

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

  @OneToMany('Link', 'user', {
    cascade: true,
  })
  links: Link[];
}
