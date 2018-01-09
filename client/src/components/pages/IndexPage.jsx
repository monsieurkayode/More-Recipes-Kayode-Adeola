import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';

import {
  fetchRecipesAction,
  logoutAction,
  fetchTopRecipes,
  fetchSampleRecipes,
} from '../../actions';
import { LandingNavbar, HomeNavbar, Banner } from '../headers/Index.jsx';
import { Contents, WelcomeMessage, SideNav, Loader } from '../main/Index.jsx';
import Footer from '../footer/Index.jsx';

class IndexPage extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    };
  }

  componentWillMount() {
    if (localStorage.token && this.props.isAuthenticated) {
      this.props.fetchRecipesAction()
        .then(() => this.setState({
          isLoading: false
        }));
      this.props.fetchTopRecipes();
    } else {
      this.props.fetchSampleRecipes(() => setTimeout(() => {
        this.setState({
          isLoading: false
        });
      }, 2000));
    }
  }

  componentDidMount() {
    $('.dropdown-button').dropdown();
    $('.button-collapse').sideNav();
    $('.collapsible').collapsible();
  }

  componentDidUpdate() {
    $('select').material_select();
    $('.dropdown-button').dropdown();
    $('.button-collapse').sideNav();
    $('.collapsible').collapsible();
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        { isLoading ?
          <Loader /> :
          <div>
            { this.props.isAuthenticated ?
              <HomeNavbar {...this.props} /> : <LandingNavbar /> }
            <Banner />
            <WelcomeMessage />
            <Contents />
            <Footer />
            <SideNav />
          </div>}
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
  fetchSampleRecipes: PropTypes.func.isRequired
};

export default connect(mapStateToProps,
  {
    fetchRecipesAction,
    logoutAction,
    fetchTopRecipes,
    fetchSampleRecipes
  }
)(IndexPage);
