import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Chat } from '../chat/chat.model';
import { User } from '../users/users.model';

@Table({ tableName: 'messages' })
export class Message extends Model<Message> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ForeignKey(() => Chat)
  @Column({ type: DataType.INTEGER, allowNull: false })
  chatId: number;
}
