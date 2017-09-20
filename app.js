import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './server/routes/index';

const userRoute = router.user,
  recipeRoute = router.recipe,
  reviewRoute = router.review,
  favoriteRoute = router.favorite,
  voteRoute = router.vote;

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use('/api/v1/apidocs', express.static('apidoc'));

app.use(userRoute);
app.use(recipeRoute);
app.use(reviewRoute);
app.use(favoriteRoute);
app.use(voteRoute);

app.get('/api', (req, res) => {
  res.status(200).send({
    status: 'success',
    message: 'Status connected ok',
  });
});

app.all('*', (req, res) => res.status(404).send({
  message: 'Oops! 404. Page not Found',
}));

export default app;
