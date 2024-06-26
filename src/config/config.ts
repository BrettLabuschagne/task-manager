import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User';
import { Task } from '../models/Task';
import { Status } from '../models/Status';
import { Label } from '../models/Label';
import { TaskLabel } from '../models/TaskLabel';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [User, Task, Status, Label, TaskLabel],
});

export default sequelize;
