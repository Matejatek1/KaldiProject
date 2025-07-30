import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages.service';
import { Message } from './message.entity';
import { ConversationsModule } from 'src/conversations/conversations.models';
import { MessageProfile } from 'src/profile/messages.profile';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    forwardRef(() => ConversationsModule),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [MessagesService, MessageProfile],
  exports: [MessagesService],
})
export class MessagesModule {}
