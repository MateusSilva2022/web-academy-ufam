import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';
import swaggerUi from 'swagger-ui-express';

import v1Router from './router/v1Router';
import { setLangCookie } from './middlewares/setLangCookie';

const swaggerFile = require('./swagger-output.json');
const app = express();
const port = Number(process.env.PORT) || 4455;

app.use(express.json());

app.use(cookieParser());

app.use(
  session({
    genid: () => uuidv4(),
    secret: 'Hi9Cf#mK98',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(setLangCookie);

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/v1', v1Router);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});