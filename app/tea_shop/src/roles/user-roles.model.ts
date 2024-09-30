import { Column, Model, Table, PrimaryKey, DataType, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Role } from './roles.model';

@Table({
  tableName: 'user_roles',
  createdAt: false,
  updatedAt: false
})  
export class UserRoles extends Model<UserRoles> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(()=>Role)
  @Column({
    type: DataType.INTEGER
  })
  roleId: number;

  @ForeignKey(()=>User)
  @Column({
    type: DataType.INTEGER
  })
  userID: number;

}
