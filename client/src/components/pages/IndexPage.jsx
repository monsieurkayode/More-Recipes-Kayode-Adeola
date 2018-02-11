import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';

import {
  fetchRecipesAction,
  logoutAction,
  fetchTopRecipes,
} from '../../actions';
import { HomeNavbar, Banner } from '../headers';
import {
  Category,
  Recipes,
  TopRecipes,
  WelcomeMessage,
  SideNav,
  Loader
} from '../main';
import Footer from '../footer';
import Homepage from './Homepage';
import materializeJavascript from '../../utils/materializeJavascript';

/**
 * @summary - IndexPage class declaration
 * @class IndexPage
 * @extends {Component}
 */
export class IndexPage extends Component {
  /**
   * Component constructor
   * @param {object} props
   * @memberOf IndexPage
   */
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  /**
   * @method componentDidMount
   *
   * @returns {undefined}
   */
  componentDidMount() {
    if (localStorage.getItem('token') && this.props.isAuthenticated) {
      const currentPage = localStorage.getItem('currentPage');
      this.props.fetchRecipesAction(currentPage)
        .then(() => this.setState({
          isLoading: false
        }));
      this.props.fetchTopRecipes();
    }
  }

  /**
   * @method componentDidUpdate
   *
   * @returns {undefined}
   */
  componentDidUpdate() {
    materializeJavascript();
  }

  /**
   * Renders the component
   * @method render
   *
   * @returns {JSX} JSX
   */
  render() {
    const { isLoading } = this.state;
    const { isAuthenticated } = this.props;
    return (
      <div>
        { isAuthenticated ?
          <div>
            { isLoading ?
              <Loader /> :
              <div>
                <HomeNavbar {...this.props} />
                <Banner />
                <WelcomeMessage />
                <div className="row">
                  <Category />
                  <Recipes />
                  <TopRecipes />
                </div>
                <Footer />
                <SideNav />
              </div>}
          </div>
          :
          <Homepage />
        }
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
  logoutAction: PropTypes.func.isRequired
};

export default connect(mapStateToProps,
  {
    fetchRecipesAction,
    logoutAction,
    fetchTopRecipes,
  }
)(IndexPage);
