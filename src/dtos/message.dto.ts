import { AutoMap } from '@automapper/classes';

export class MessageDto {
  @AutoMap()
  public message: string;
  @AutoMap()
  public senderId: number;
}
