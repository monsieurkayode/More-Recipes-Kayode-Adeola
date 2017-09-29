import React, { Component } from 'react';
import { LandingNavbar, Banner } from './headers/Index';
import { SigninModal, SignupModal, NewPostModal } from './modals/Index';
import WelcomeMessage from './main/WelcomeMessage';
import Footer from './footer/Footer';

class IndexPage extends Component {
  render() {
    return (
      <div>
        <LandingNavbar />
        <Banner />
        <WelcomeMessage />
        <Footer />
        <SigninModal />
        <SignupModal />
        <NewPostModal />
      </div>
    );
  }
}

export default IndexPage;