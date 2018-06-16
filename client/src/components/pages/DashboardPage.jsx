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
import { Loader } from '../main';
import materializeJavascript from '../../utils/materializeJavascript';

/**
 * @summary - DashboardPage class declaration
 * @class DashboardPage
 * @extends {Component}
 */
export class DashboardPage extends Component {
  /**
   * @method componentDidMount
   *
   * @returns {undefined}
   */
  componentDidMount() {
    const currentPage = localStorage.getItem('currentPageUserRecipes');
    const currentPageFav = localStorage.getItem('currentPageUserFavorites');
    this.props.isFetching(true, 'Dashboard');
    this.props.fetchUserRecipes(currentPage);
    this.props.fetchUserFavorites(currentPageFav);
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
    const { isLoading } = this.props;
    const deletePostDialog = 'Delete recipe';
    const removeFavDialog = 'Remove from favorite';
    const { route } = this.props.match.params;
    return (
      <div>
        {isLoading ?
          <Loader /> :
          <div>
            <DashboardNavbar {...this.props} />
            <div className="row">
              <DashboardPanel user={this.props.user} />
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
              id={this.props.selectedRecipe}
              dialog={route === 'recipes' ? deletePostDialog : removeFavDialog}
              handleAction={route === 'recipes' ?
                this.props.deletePost :
                this.props.removeFavorite
              }
            />
            <SideNavDashboard user={this.props.user} />
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
  isLoading: isLoading.dashBoardIsLoading,
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
  isLoading: PropTypes.bool.isRequired,
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
