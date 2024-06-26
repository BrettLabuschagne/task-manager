import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Task } from './Task';
import { Label } from './Label';

@Table({
  tableName: 'task_labels',
  timestamps: false,
})
export class TaskLabel extends Model {
  @ForeignKey(() => Task)
  @Column
  taskId!: number;

  @ForeignKey(() => Label)
  @Column
  labelId!: number;
}
