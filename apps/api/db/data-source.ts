import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  database: process.env.DB_DATABASE ?? 'nestjs_blog',
  entities: ['dist/**/*.entity.js'],
  host: process.env.DB_HOST ?? '127.0.0.1',
  logging: true,
  migrations: ['dist/db/migrations/*.js'],
  password: process.env.DB_PASSWORD ?? 'secret_pass',
  port: parseInt(process.env.DB_PORT ?? '', 10) || 5432,
  synchronize: false,
  type: 'postgres',
  username: process.env.DB_USERNAME ?? 'postgres',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
