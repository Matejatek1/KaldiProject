import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Conversation } from 'src/conversations/conversation.entity';
import { TakeConversationDto } from 'src/dtos/take-conversation.dto';

@Injectable()
export class CovnersationProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        Conversation,
        TakeConversationDto,
        forMember(
          (dest) => dest.roomId,
          mapFrom((src) => src.room)
        ),
        forMember(
          (dest) => dest.senderId,
          mapFrom((src) => src.userId)
        ),
        forMember(
          (dest) => dest.senderName,
          mapFrom((src) => src.userName)
        )
      );
    };
  }
}
