import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Task } from './Task';
import { TaskLabel } from './TaskLabel';

@Table({
  tableName: 'labels',
  timestamps: false,
})
export class Label extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name!: string;

  @BelongsToMany(() => Task, () => TaskLabel)
  tasks!: Task[];
}
