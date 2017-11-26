import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'proptypes';

import { SigninForm } from './Index.jsx';

class SigninPage extends Component {
  componentDidMount() {
    $('.button-collapse').sideNav();
  }
  render() {
    return (
      <div>
        <nav className="header" >
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo return" >
              <span className="fa fa-angle-left" /> Back to More-Recipies
            </Link>
            <a data-activates="navlink" className="button-collapse">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down return">
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
            <ul className="side-nav teal" id="navlink">
              <li>
                <Link to="/signup" className="white-text">Sign Up</Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="row center-align">
          <div className="col s12 l6 m8 offset-l3 offset-m2">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <h5>Login</h5>
              </div>
            </div>
          </div>
        </div>
        <SigninForm history={this.props.history} />
      </div>
    );
  }
}

SigninPage.propTypes = {
  history: PropTypes.shape({}).isRequired
};

export default SigninPage;
