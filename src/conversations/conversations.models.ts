import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './conversation.entity';
import { ConversationsService } from './conversations.service';
import { MessagesModule } from 'src/messages/messages.models';
import { RoomsModule } from 'src/rooms/rooms.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { CovnersationProfile } from 'src/profile/conversation.profile';
@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation]),
    forwardRef(() => MessagesModule),
    RoomsModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [ConversationsService, CovnersationProfile],
  exports: [ConversationsService],
})
export class ConversationsModule {}
