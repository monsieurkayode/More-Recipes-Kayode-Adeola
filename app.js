import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './server/routes/index';

const userRoute = router.user;

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(express.static('template'));

app.use(userRoute);

app.get('/api', (req, res) => {
  res.status(200).send({
    message: 'Status connected ok',
  });
});

app.get('*', (req, res) => res.status(404).send({
  message: 'No page found',
}));

export default app;
