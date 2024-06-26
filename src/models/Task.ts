import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { User } from './User';
import { Status } from './Status';
import { Label } from './Label';
import { TaskLabel } from './TaskLabel';

@Table({
  tableName: 'tasks',
  timestamps: true,
})
export class Task extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  dueDate!: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  priority!: number;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Status)
  @Column
  statusId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Status)
  status!: Status;

  @BelongsToMany(() => Label, () => TaskLabel)
  labels!: Label[];
}
