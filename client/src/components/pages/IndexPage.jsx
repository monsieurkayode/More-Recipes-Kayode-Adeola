import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';

import {
  fetchRecipesAction,
  logoutAction,
  fetchTopRecipes,
  fetchSampleRecipes,
} from '../../actions';
import { LandingNavbar, HomeNavbar, Banner } from '../headers';
import { Contents, WelcomeMessage, SideNav, Loader } from '../main';
import Footer from '../footer';

/**
 * @summary - IndexPage class declaration
 * @class IndexPage
 * @extends {Component}
 */
class IndexPage extends Component {
  /**
   * Component constructor
   * @param {object} props
   * @memberOf IndexPage
   */
  constructor() {
    super();
    this.state = {
      isLoading: true
    };
  }

  /**
   * @method componentWillMount
   *
   * @param {void} void
   *
   * @returns {void}
   */
  componentWillMount() {
    if (localStorage.token && this.props.isAuthenticated) {
      const currentPage = localStorage.getItem('currentPage');
      this.props.fetchRecipesAction(currentPage)
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

  /**
   * @method componentDidUpdate
   *
   * @param {void} void
   *
   * @returns {void}
   */
  componentDidUpdate() {
    $('select').material_select();
    $('.dropdown-button').dropdown();
    $('.button-collapse').sideNav();
    $('.collapsible').collapsible();
  }

  /**
   * Renders the component
   * @method render
   *
   * @returns {JSX} JSX
   */
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
