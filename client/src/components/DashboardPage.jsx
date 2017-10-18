import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutAction } from '../actions';

import { DashboardNavbar } from './headers/Index';
import {
  DashboardPanel,
  SideNavDashboard,
  UserRecipe,
  UserFavoriteRecipe,
  UserProfile } from './dashboard/Index';
import { DeleteModal, NewPostModal, EditPostModal } from './modals/Index';

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: props.isAuthenticated
    }
    console.log(this.state.isAuthenticated)
  }

  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/signin');
    }
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <div>
        <DashboardNavbar onClick={this.props.logoutAction}/>
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

const mapStateToProps = ({ signinState, logoutState }) => {
  return { 
    user: signinState.user,
    isAuthenticated: signinState.isAuthenticated
  }
}

export default connect(mapStateToProps, { logoutAction })(DashboardPage);