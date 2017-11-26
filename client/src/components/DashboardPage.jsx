import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutAction } from '../actions';

import { DashboardNavbar } from './headers/Index.jsx';
import {
  DashboardPanel,
  SideNavDashboard,
  UserRecipe,
  UserFavoriteRecipe,
  UserProfile } from './dashboard/Index.jsx';
import { DeleteModal, NewPostModal, EditPostModal } from './modals/Index.jsx';

class DashboardPage extends Component {
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
          <UserProfile />
          <UserRecipe />
          <UserFavoriteRecipe />
        </div>
        <DeleteModal />
        <NewPostModal />
        <EditPostModal />
        <SideNavDashboard />
      </div>
    );
  }
}

const mapStateToProps = ({ signinState }) => ({
  user: signinState.user,
  isAuthenticated: signinState.isAuthenticated
});

export default connect(mapStateToProps, { logoutAction })(DashboardPage);
