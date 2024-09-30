import { Column, Model, Table, PrimaryKey, DataType, BelongsToMany } from 'sequelize-typescript';
import {ApiProperty} from "@nestjs/swagger";
import { User } from 'src/users/users.model';
import { UserRoles } from './user-roles.model';

interface RoleCreationAttrs {
    value: string;
    description: string;
    password: string;
}

@Table({
  tableName: 'roles',
})
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({example: '1',description:'Уникальный идентификатор роли'})
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({example: 'ADMIN',description:'Уникальное значение роли'})
  @Column({
    type: DataType.STRING(255),
    unique: true,
    allowNull: false,
  })
  value: string;

  @ApiProperty({example: 'Администратор',description:'Описание роли'})
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
