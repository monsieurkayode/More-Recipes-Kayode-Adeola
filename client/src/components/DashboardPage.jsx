import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';

import {
  logoutAction,
  routeAction,
  fetchUserRecipes,
  fetchUserFavorites,
  deletePost,
} from '../actions';
import { DashboardNavbar } from './headers/Index.jsx';
import {
  DashboardPanel,
  SideNavDashboard,
  UserRecipe,
  UserFavoriteRecipe,
  UserProfile,
} from './dashboard/Index.jsx';
import {
  DeleteModal,
  NewPostModal,
  EditPostModal,
} from './modals/Index.jsx';

class DashboardPage extends Component {
  componentWillMount() {
    this.props.routeAction(this.props.selected);
    this.props.fetchUserRecipes();
    this.props.fetchUserFavorites();
  }

  componentDidMount() {
    $('.dropdown-button').dropdown();
    $('.button-collapse').sideNav();
    $('#modal-delete').modal();
    $('#modal-edit').modal();
  }

  render() {
    return (
      <div>
        <DashboardNavbar {...this.props} />
        <div className="row">
          <DashboardPanel />
          {
            this.props.selected === 'profile' &&
            <UserProfile {...this.props} />
          }
          {
            this.props.selected === 'recipes' &&
            <UserRecipe {...this.props} />
          }
          {
            this.props.selected === 'favorites' &&
            <UserFavoriteRecipe {...this.props} />
          }
        </div>
        <DeleteModal />
        <NewPostModal />
        <EditPostModal />
        <SideNavDashboard />
      </div>
    );
  }
}

const mapStateToProps = ({
  signinState,
  routing,
  userRecipes,
  userFavorites,
}) => ({
  user: signinState.user,
  isAuthenticated: signinState.isAuthenticated,
  selected: routing.selected,
  userRecipes,
  userFavorites,
});

DashboardPage.propTypes = {
  routeAction: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  fetchUserRecipes: PropTypes.func.isRequired,
  userRecipes: PropTypes.shape({}).isRequired,
  userFavorites: PropTypes.shape({}).isRequired,
  fetchUserFavorites: PropTypes.func.isRequired,
};

export default connect(mapStateToProps,
  {
    logoutAction,
    routeAction,
    fetchUserRecipes,
    fetchUserFavorites,
    deletePost,
  }
)(DashboardPage);
