import React, { Component } from 'react';
import { Link } from 'react-router';

class SigninPage extends Component {
  render() {
    return (
      <div>
        <nav className="header" >
            <div className="nav-wrapper">
              <Link to="/" className="brand-logo return" ><span className="fa fa-angle-left"></span> Back to More-Recipies</Link>
              <a data-activates="navlink" className="button-collapse"><i className="material-icons">menu</i></a>         
                <ul className="right hide-on-med-and-down return">
                  <li>
                    <Link to="/signup">Sign Up</Link>
                  </li>
                </ul>
                <ul className="side-nav" id="navlink">
                  <li className="">
                    <Link to="/signup">Sign Up</Link>
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
          <div id="form" className="container">
            <div className="row">
              <form className="col l6 m8 s12 offset-l3 offset-m2">
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input id="username" type="text" className="validate" required />
                  <label htmlFor="username">Username</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock_outline</i>
                  <input id="password" type="password" className="validate" required />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="col s12 m12 l12 center-align">
                <button className="btn waves-effect waves-light" type="submit" name="action">Login
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SigninPage;