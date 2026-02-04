import express from 'express';
import { PORT } from './config.js';
import UsersRouter from './routes/routes.js';

const app = express();

app.use(express.json());
app.use('/api', UsersRouter);

app.listen(PORT, () => {
  console.log(`se inicia el servidor por el puerto: ${PORT}`);
});
