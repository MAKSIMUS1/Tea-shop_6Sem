import { Column, Model, Table, PrimaryKey, DataType, BelongsToMany, HasMany } from 'sequelize-typescript';
import {ApiProperty} from "@nestjs/swagger";
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { Post } from 'src/posts/posts.model';

interface UserCreationAttrs {
    username: string;
    email: string;
    password: string;
}

@Table({
  tableName: 'users',
})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({example: '1',description:'Уникальный идентификатор пользователя'})
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  })
  user_id: number;

  @ApiProperty({example: 'qwerty123',description:'Адрес электронной почты пользователя'})
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password: string;

  @ApiProperty({example: 'user',description:'Роль пользователя (администратор или обычный пользователь)'})
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    defaultValue: 'user',
  })
  role: string;

  @ApiProperty({example: 'user@gmail.com',description:'Адрес электронной почты пользователя'})
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  email: string;

  @ApiProperty({example: 'true', description: 'Забанен или нет'})
  @Column({type: DataType.BOOLEAN, defaultValue: false})
  banned: boolean;

  @ApiProperty({example: 'За хулиганство', description: 'Причина блокировки'})
  @Column({type: DataType.STRING, allowNull: true})
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(()=>Post)
  posts: Post[];
}
