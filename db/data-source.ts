import { Conversation } from 'src/conversations/conversation.entity';
import { Message } from 'src/messages/message.entity';
import { Room } from 'src/rooms/room.entity';
import { User } from 'src/users/users.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_DB || 'postgres',
  entities: [Conversation, Room, Message, User],
  migrations: ['dist/db/migrations/*.js'],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
