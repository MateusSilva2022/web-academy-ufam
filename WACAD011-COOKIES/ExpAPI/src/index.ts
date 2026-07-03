import 'dotenv/config';
import express from 'express';
import v1Router from './router/v1Router';

const app = express();
const port = Number(process.env.PORT) || 4455;

app.use(express.json());
app.use('/v1', v1Router);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
