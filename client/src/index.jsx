import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import decode from 'jwt-decode';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {
  IndexPage,
  SigninPage,
  SignupPage,
  PostRecipePage,
  EditRecipePage,
  NotFoundPage,
  DashboardPage,
  RecipeViewPage,
} from './components/pages/Index.jsx';

import './assets/css/font-awesome.css';
import './assets/css/materialize.css';
import './assets/css/style.css';

import reducers from './reducers';
import actionTypes from './actions/actionTypes';
import Authenticate from './utils/Authenticate.jsx';
import sampleRecipes from './utils/sampleRecipes';
import setAuthorizationToken from './utils/setAuthorizationToken';

import registerServiceWorker from './registerServiceWorker';

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers, composeEnhancers);

if (localStorage.token) {
  setAuthorizationToken(localStorage.token);
  const user = decode(localStorage.token).user;
  store.dispatch({ type: actionTypes.SIGNIN_SUCCESSFUL, payload: user });
} else {
  store
    .dispatch(
      {
        type: actionTypes.FETCH_SAMPLE_RECIPES,
        payload: sampleRecipes
      }
    );
}


render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/signin" component={SigninPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/dashboard" component={Authenticate(DashboardPage)} />
          <Route path="/recipes/new" component={Authenticate(PostRecipePage)} />
          <Route exact path="/recipes/:recipeId" component={Authenticate(RecipeViewPage)} />
          <Route path="/recipes/:recipeId/edit" component={Authenticate(EditRecipePage)} />
          <Route exact path="/" component={IndexPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
