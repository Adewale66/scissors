import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Link {
  @PrimaryColumn()
  domain: string;

  @Column({
    nullable: false,
  })
  originalUrl: string;

  @Column({
    default: 0,
    nullable: false,
  })
  clicks: number;

  @ManyToOne('User', 'links')
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
