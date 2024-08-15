import 'dotenv/config';
import { DataSource } from 'typeorm';

const config = {
  type: process.env.DATABASE_TYPE as any,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  dropSchema: false,
  entities: ['./dist/**/*.entity.js'],
  autoLoadEntities: true,
  migrations: ['./dist/db/migrations/*.js'],
  logging: false,
};
export const datasoure: DataSource = new DataSource(config);
export default config;
