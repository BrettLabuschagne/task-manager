import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Task } from './Task';

@Table({
  tableName: 'statuses',
  timestamps: false,
})
export class Status extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name!: string;

  @HasMany(() => Task)
  tasks!: Task[];
}
