import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConversationsModule } from './conversations/conversations.models';
import { MessagesModule } from './messages/messages.models';
import { RoomsModule } from './rooms/rooms.module';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UsersModule,
    ConversationsModule,
    MessagesModule,
    RoomsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
