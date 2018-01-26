import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';

import {
  logoutAction,
  routeAction,
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
} from '../dashboard';
import DeleteModal from '../modals';
import { Loader } from '../main';

/**
 * @summary - DashboardPage class declaration
 * @class DashboardPage
 * @extends {Component}
 */
class DashboardPage extends Component {
  /**
   * @method componentWillMount
   *
   * @param {void} void
   *
   * @returns {void}
   */
  componentWillMount() {
    this.props.routeAction(this.props.selected);
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
    $('.dropdown-button').dropdown();
    $('.button-collapse').sideNav();
    $('#modal-delete').modal();
    $('#modal-edit').modal();
  }

  /**
   * Renders the component
   * @method render
   *
   * @returns {JSX} JSX
   */
  render() {
    const { selected, isLoading } = this.props;
    const deletePostDialog = 'Delete recipe';
    const removeFavDialog = 'Remove from favorite';
    return (
      <div>
        {isLoading ?
          <Loader /> :
          <div>
            <DashboardNavbar {...this.props} />
            <div className="row">
              <DashboardPanel />
              {
                selected === 'profile' &&
                <UserProfile {...this.props} />
              }
              {
                selected === 'recipes' &&
                <UserRecipe {...this.props} />
              }
              {
                selected === 'favorites' &&
                <UserFavoriteRecipe {...this.props} />
              }
            </div>
            <DeleteModal
              selected={selected}
              dialog={selected === 'recipes' ?
                deletePostDialog : removeFavDialog}
              id={this.props.selectedRecipe}
              handleAction={selected === 'recipes' ?
                this.props.deletePost :
                this.props.removeFavorite
              }
            />
            <SideNavDashboard />
          </div>}
      </div>
    );
  }
}

const mapStateToProps = ({
  signinState,
  routing,
  userRecipes,
  userFavorites,
  selectedRecipe,
  isLoading
}) => ({
  user: signinState.user,
  isAuthenticated: signinState.isAuthenticated,
  selected: routing.selected,
  userRecipes,
  userFavorites,
  selectedRecipe,
  isLoading: isLoading.dashBoardIsLoading,
  isLoadingRecipes: isLoading.userRecipesIsLoading,
  isLoadingFavorites: isLoading.userFavoritesIsLoading
});

DashboardPage.defaultProps = {
  selectedRecipe: 0
};

DashboardPage.propTypes = {
  routeAction: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  fetchUserRecipes: PropTypes.func.isRequired,
  userRecipes: PropTypes.shape({}).isRequired,
  userFavorites: PropTypes.shape({}).isRequired,
  fetchUserFavorites: PropTypes.func.isRequired,
  selectedRecipe: PropTypes.number,
  deletePost: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  isFetching: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps,
  {
    logoutAction,
    routeAction,
    fetchUserRecipes,
    fetchUserFavorites,
    deletePost,
    removeFavorite,
    selectRecipe,
    isFetching
  }
)(DashboardPage);
