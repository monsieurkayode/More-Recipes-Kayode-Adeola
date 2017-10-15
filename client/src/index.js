import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import App from './App.jsx';
// import NotFoundPage from './components/NotFoundPage';
import IndexPage from './components/IndexPage';
import { SigninPage, SignupPage } from './components/main/Index';
import DashboardPage from './components/DashboardPage';
import RecipeViewPage from './components/RecipeViewPage';

import './css/font-awesome.css';
import './css/materialize.css';
import './css/style.css';

import reducers from './reducers';

import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

render(
  <Provider store={createStoreWithMiddleware(reducers, composeEnhancers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/signin" component={SigninPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/recipeview" component={RecipeViewPage} />
          <Route path="/" component={IndexPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
