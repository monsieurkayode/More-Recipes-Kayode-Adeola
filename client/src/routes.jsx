import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  IndexPage,
  SigninPage,
  SignupPage,
  PostRecipePage,
  EditRecipePage,
  NotFoundPage,
  DashboardPage,
  RecipeViewPage,
} from './components/pages';
import Authenticate from './utils/Authenticate';

const Routes = () => (
  <Switch>
    <Route path="/signin" component={SigninPage} />
    <Route path="/signup" component={SignupPage} />
    <Route
      path="/dashboard"
      component={Authenticate(DashboardPage)}
    />
    <Route
      path="/recipes/new"
      component={Authenticate(PostRecipePage)}
    />
    <Route
      exact
      path="/recipes/:recipeId"
      component={Authenticate(RecipeViewPage)}
    />
    <Route
      path="/recipes/:recipeId/edit"
      component={Authenticate(EditRecipePage)}
    />
    <Route exact path="/" component={IndexPage} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);

export default Routes;
