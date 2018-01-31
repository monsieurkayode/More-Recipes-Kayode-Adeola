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
  CategoryPage
} from './components/pages';
import Authenticate from './utils/Authenticate';

/**
 * Routes
 * @function Routes
 *
 * @param {void} void
 *
 * @return {JSX} JSX
 */
const Routes = () => (
  <Switch>
    <Route exact path="/signin" component={SigninPage} />
    <Route exact path="/signup" component={SignupPage} />
    <Route
      exact
      path="/dashboard/:route"
      component={Authenticate(DashboardPage)}
    />
    <Route
      exact
      path="/category/:categoryName"
      component={Authenticate(CategoryPage)}
    />
    <Route
      exact
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
