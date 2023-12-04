import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: '123456',
  database: 'echoes',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false,
};
