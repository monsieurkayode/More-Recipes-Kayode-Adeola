import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';

import {
  fetchRecipesAction,
  logoutAction,
  fetchTopRecipes
} from '../../actions';
import { LandingNavbar, HomeNavbar, Banner } from '../headers/Index.jsx';
import { Contents, WelcomeMessage, SideNav } from '../main/Index.jsx';
import Footer from '../footer/Index.jsx';

class IndexPage extends Component {
  componentWillMount() {
    if (localStorage.token && this.props.isAuthenticated) {
      this.props.fetchRecipesAction();
      this.props.fetchTopRecipes();
    }
  }

  componentDidMount() {
    $('.dropdown-button').dropdown();
    $('.button-collapse').sideNav();
  }

  render() {
    return (
      <div>
        { this.props.isAuthenticated ?
          <HomeNavbar {...this.props} /> : <LandingNavbar /> }
        <Banner />
        <WelcomeMessage />
        <Contents />
        <Footer />
        <SideNav />
      </div>
    );
  }
}

const mapStateToProps = ({
  recipes,
  signinState
}) => ({
  recipes,
  user: signinState.user,
  isAuthenticated: signinState.isAuthenticated,
});

IndexPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  fetchRecipesAction: PropTypes.func.isRequired,
  fetchTopRecipes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps,
  {
    fetchRecipesAction,
    logoutAction,
    fetchTopRecipes
  }
)(IndexPage);
