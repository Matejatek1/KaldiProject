import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { MessageDto } from 'src/dtos/message.dto';
import { Message } from 'src/messages/message.entity';

@Injectable()
export class MessageProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Message, MessageDto);
    };
  }
}
