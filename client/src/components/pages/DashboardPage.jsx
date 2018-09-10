import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';

import {
  logoutAction,
  fetchUserRecipes,
  fetchUserFavorites,
  deletePost,
  removeFavorite,
  selectRecipe,
  isFetching
} from '../../actions';
import { DashboardNavbar } from '../headers';
import {
  DashboardPanel,
  SideNavDashboard,
  UserRecipe,
  UserFavoriteRecipe,
  UserProfile,
  UserNotification
} from '../dashboard';
import DeleteModal from '../modals';
import { NotFoundPage } from '../pages';
import { Loader } from '../main';
import materializeJavascript from '../../utils/materializeJavascript';

/**
 * @summary - DashboardPage class declaration
 * @class DashboardPage
 * @extends {Component}
 */
export class DashboardPage extends Component {
  /**
   * @method componentWillMount
   *
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.isFetching(true, 'DashboardPage');
  }

  /**
   * @method componentDidUpdate
   *
   * @param {void} void
   *
   * @returns {void}
   */
  componentDidUpdate() {
    materializeJavascript();
  }

  /**
   * Renders the component
   * @method render
   *
   * @returns {JSX} JSX
   */
  render() {
    const deletePostDialog = 'Delete recipe';
    const removeFavDialog = 'Remove from favorite';
    const { match, user, selectedRecipe, isLoadingDashboard } = this.props;
    const { route } = match.params;
    const routes = ['profile', 'recipes', 'favorites', 'notifications'];

    if (!routes.includes(route)) {
      return <NotFoundPage {...this.props} />;
    }

    if (isLoadingDashboard) {
      return <Loader />;
    }

    return (
      <div>
        { isLoadingDashboard && <Loader /> }
        { !isLoadingDashboard &&
        <div>
          <DashboardNavbar {...this.props} />
          <div className="row">
            <DashboardPanel user={this.props.user} route={route} />
            {
              route === 'profile' &&
              <UserProfile selected={route} {...this.props} />
            }
            {
              route === 'recipes' &&
              <UserRecipe selected={route} {...this.props} />
            }
            {
              route === 'favorites' &&
                <UserFavoriteRecipe selected={route} {...this.props} />
            }
            {
              route === 'notifications' &&
                <UserNotification selected={route} {...this.props} />
            }
          </div>
          <DeleteModal
            selected={route}
            id={selectedRecipe}
            dialog={route === 'recipes' ? deletePostDialog : removeFavDialog}
            handleAction={route === 'recipes' ?
              this.props.deletePost :
              this.props.removeFavorite
            }
          />
          <SideNavDashboard user={user} route={route} />
        </div>}
      </div>
    );
  }
}

const mapStateToProps = ({
  signinState,
  userRecipes,
  userFavorites,
  selectedRecipe,
  isLoading
}) => ({
  user: signinState.user,
  isAuthenticated: signinState.isAuthenticated,
  userRecipes,
  userFavorites,
  selectedRecipe,
  isLoadingDashboard: isLoading.dashboardIsLoading,
  isLoadingProfile: isLoading.userProfileIsLoading,
  isLoadingRecipes: isLoading.userRecipesIsLoading,
  isLoadingFavorites: isLoading.userFavoritesIsLoading
});

DashboardPage.defaultProps = {
  user: {},
  selectedRecipe: 0,
  userFavorites: {},
  userRecipes: {},
};

DashboardPage.propTypes = {
  user: PropTypes.shape({}),
  fetchUserRecipes: PropTypes.func.isRequired,
  userRecipes: PropTypes.shape({}),
  userFavorites: PropTypes.shape({}),
  fetchUserFavorites: PropTypes.func.isRequired,
  selectedRecipe: PropTypes.number,
  deletePost: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  isFetching: PropTypes.func.isRequired,
  isLoadingDashboard: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      route: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default connect(mapStateToProps,
  {
    logoutAction,
    fetchUserRecipes,
    fetchUserFavorites,
    deletePost,
    removeFavorite,
    selectRecipe,
    isFetching
  }
)(DashboardPage);
