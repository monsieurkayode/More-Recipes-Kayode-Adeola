import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';

import { logoutAction } from '../actions';
import { DashboardNavbar } from './headers/Index.jsx';
import {
  DashboardPanel,
  SideNavDashboard,
  UserRecipe,
  UserFavoriteRecipe,
  UserProfile,
} from './dashboard/Index.jsx';
import { DeleteModal, NewPostModal, EditPostModal } from './modals/Index.jsx';
import routeAction from '../actions/routeAction';

class DashboardPage extends Component {
  componentWillMount() {
    this.props.routeAction(this.props.selected);
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
            this.props.selected === 'profile' && <UserProfile />
          }
          {
            this.props.selected === 'recipes' && <UserRecipe />
          }
          {
            this.props.selected === 'favorites' && <UserFavoriteRecipe />
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

const mapStateToProps = ({ signinState, routing }) => ({
  user: signinState.user,
  isAuthenticated: signinState.isAuthenticated,
  selected: routing.selected,
});

DashboardPage.propTypes = {
  routeAction: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
};

export default connect(mapStateToProps,
  { logoutAction, routeAction }
)(DashboardPage);
