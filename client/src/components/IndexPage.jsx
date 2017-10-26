import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipesAction, logoutAction } from '../actions'
import { LandingNavbar, HomeNavbar, Banner } from './headers/Index';
import { SigninModal, SignupModal, NewPostModal } from './modals/Index';
import { Contents, WelcomeMessage } from './main/Index';
import Footer from './footer/Footer';

class IndexPage extends Component {
  componentWillMount() {
    if (localStorage.token && this.props.isAuthenticated) {
      this.props.fetchRecipesAction();
    }
  }
  
  render() {
    return (
      <div>
        { this.props.isAuthenticated ?
          <HomeNavbar 
            onClick={this.props.logoutAction} /> : <LandingNavbar /> }
        <Banner />
        <WelcomeMessage />
        <Contents />
        <Footer />
        <SigninModal />
        <SignupModal />
        <NewPostModal />
      </div>
    );
  }
}

const mapStateToProps = ({ recipes, recipesState, signinState }) => {
  return { 
    recipes,
    isAuthenticated: signinState.isAuthenticated,
    recipesState
  }
};

export default connect(mapStateToProps, { fetchRecipesAction, logoutAction })(IndexPage);