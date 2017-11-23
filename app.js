import express from 'express';
import logger from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import favicon from 'serve-favicon';
import swaggerUi from 'swagger-ui-express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from './webpack.config';
import router from './server/routes/index';

const swaggerDocument = require('./swagger.json'),
  options = {
    validatorUrl: 'https://online.swagger.io/validator'
  };

const userRoute = router.user,
  recipeRoute = router.recipe,
  reviewRoute = router.review,
  favoriteRoute = router.favorite,
  voteRoute = router.vote;

const app = express();

app.use(logger('dev'));

app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(favicon(path.join(__dirname, 'client/public', 'favicon.ico')));

app.use(
  '/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options)
);

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
  next();
});

app.use(webpackMiddleware(webpack(webpackConfig), {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(webpack(webpackConfig)));

app.get('/api', (req, res) => {
  res.status(200).send({
    status: 'success',
    message: 'Status connected ok',
  });
});

app.use(userRoute);
app.use(recipeRoute);
app.use(reviewRoute);
app.use(favoriteRoute);
app.use(voteRoute);

app.use(express.static(path.join(__dirname, '/client/public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/src/index.html'));
});

app.all('*', (req, res) => res.status(404).send({
  message: 'Oops! 404. Page not Found',
}));

export default app;
