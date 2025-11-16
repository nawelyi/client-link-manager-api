import express from 'express';
import swaggerUi from 'swagger-ui-express';
import {openApiSpecification} from './core/swagger';
import apiRouter from './api/index';

const app = express();


app.use(express.json());

app.use('/api/v1', apiRouter);

app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(openApiSpecification);
})

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/api-docs.json',
    },
  })
);

export default app;