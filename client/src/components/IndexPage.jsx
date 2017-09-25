import React, { Component } from 'react';
import { LandingNavbar, Banner } from './headers/Index';
import { SigninModal, SignupModal, NewPostModal } from './modals/Index';
import WelcomeMessage from './mainpage/WelcomeMessage';
import Footer from './footer/Footer';

// import HomeNavbar from './headers/HomeNavbar';

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