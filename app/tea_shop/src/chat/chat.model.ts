// chat/chat.model.ts
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Message } from '../message/message.model';

@Table({ tableName: 'chats' })
export class Chat extends Model<Chat> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @BelongsToMany(() => User, () => Message)
  users: User[];
}
