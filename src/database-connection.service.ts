import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: 'default',
      type: 'postgres',
      url:
        'postgres://frtwwmnm:DuBg-yNcfMu_8FsPqAnmrbM_q2qOEjAy@ruby.db.elephantsql.com:5432/frtwwmnm',
      // host: process.env.DATABASE_HOST,
      // port: Number(process.env.DATABASE_PORT),
      // database: process.env.DATABASE_DB,
      // username: process.env.DATABASE_USER,
      // password: process.env.DATABASE_PASSWORD,
      synchronize: true,
      dropSchema: false,
      logging: true,
      entities: ['dist/**/*.entity.js'],
    };
  }
}
