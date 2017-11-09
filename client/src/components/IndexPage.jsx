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
          <HomeNavbar { ...this.props } /> : <LandingNavbar /> }
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

const mapStateToProps = ({ recipes,  signinState }) => {
  return { 
    recipes,
    user: signinState.user,
    isAuthenticated: signinState.isAuthenticated,
  }
};

export default connect(mapStateToProps, { fetchRecipesAction, logoutAction })(IndexPage);