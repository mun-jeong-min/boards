import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './board/board.module';
import * as dotenv from 'dotenv'
import { Board } from './board/entity/board.entity';
import { User } from './auth/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
dotenv.config();

@Module({
  imports: [BoardModule,
    AuthModule,
  TypeOrmModule.forRoot({
    type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Board, User],
      synchronize: true,
  }),
  EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
