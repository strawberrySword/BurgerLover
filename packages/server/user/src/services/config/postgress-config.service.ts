import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { User } from 'src/user.entity';

export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host:
        process.env.DB_HOST_NAME ||
        'ep-shy-tree-670478-pooler.eu-central-1.aws.neon.tech',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'shaharglame',
      password: process.env.DB_PASSWORD || 'VI6zi9wBqETP',
      ssl: true,
      database: 'user',
      entities: [User],
      synchronize: true,
      logging: true,
    };
  }
}
