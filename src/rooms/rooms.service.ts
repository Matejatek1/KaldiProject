import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>
  ) {}

  getRooms(): Promise<Array<Room>> {
    return this.roomsRepository.find();
  }
  getRoomById(roomId: number): Promise<Room> {
    if (roomId == null)
      throw new NotFoundException('Room with id: ' + roomId + ' not found');
    return this.roomsRepository.findOne({ where: { id: roomId } });
  }
}
