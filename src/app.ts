import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/config';
import router from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
