import React, { Component } from 'react';
import { LandingNavbar, Banner } from './headers/Index';
import { SigninModal, SignupModal, NewPostModal } from './modals/Index';
import { Contents, WelcomeMessage } from './main/Index';
import Footer from './footer/Footer';

class IndexPage extends Component {
  componentWillMount() {
    if (localStorage.token) {
      this.props.history.push('/dashboard');
    }
  }
  
  render() {
    return (
      <div>
        <LandingNavbar />
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

export default IndexPage;