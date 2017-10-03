import React, { Component } from 'react';

import { DashboardNavbar } from './headers/Index';
import { DashboardPanel, SideNavDashboard, UserRecipe, UserFavoriteRecipe, UserProfile } from './dashboard/Index';
import { DeleteModal, NewPostModal, EditPostModal } from './modals/Index';

class DashboardPage extends Component {
  render() {
    return (
      <div>
        <DashboardNavbar />
        <div className="row">
          <DashboardPanel />
          <UserRecipe />
          <UserProfile />
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

export default DashboardPage;