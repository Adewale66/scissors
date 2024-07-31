import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  @Index()
  key: string;

  @Column({
    nullable: false,
  })
  ip: string;

  @Column({
    nullable: false,
  })
  qrcode: string;

  @Column({
    nullable: false,
  })
  shortUrl: string;

  @Column({
    nullable: false,
  })
  originalUrl: string;

  @Column({
    default: 0,
    nullable: false,
  })
  clicks: number;

  @CreateDateColumn()
  createdAt: Date;
}
