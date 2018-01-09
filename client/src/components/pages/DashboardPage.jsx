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
} from '../../actions';
import { DashboardNavbar } from '../headers/Index.jsx';
import {
  DashboardPanel,
  SideNavDashboard,
  UserRecipe,
  UserFavoriteRecipe,
  UserProfile,
} from '../dashboard/Index.jsx';
import {
  DeleteModal,
  NewPostModal,
  EditPostModal,
} from '../modals/Index.jsx';
import { Loader } from '../main/Index.jsx';

class DashboardPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    };
  }
  componentWillMount() {
    this.props.routeAction(this.props.selected);
    this.props.fetchUserRecipes()
      .then(() => this.setState({
        isLoading: false
      }));
    this.props.fetchUserFavorites();
  }

  componentDidMount() {
    $('.dropdown-button').dropdown();
    $('.button-collapse').sideNav();
    $('#modal-delete').modal();
    $('#modal-edit').modal();
  }

  render() {
    const { selected } = this.props;
    const { isLoading } = this.state;
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
            <NewPostModal />
            <EditPostModal />
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
}) => ({
  user: signinState.user,
  isAuthenticated: signinState.isAuthenticated,
  selected: routing.selected,
  userRecipes,
  userFavorites,
  selectedRecipe
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
  removeFavorite: PropTypes.func.isRequired
};

export default connect(mapStateToProps,
  {
    logoutAction,
    routeAction,
    fetchUserRecipes,
    fetchUserFavorites,
    deletePost,
    removeFavorite,
    selectRecipe
  }
)(DashboardPage);
