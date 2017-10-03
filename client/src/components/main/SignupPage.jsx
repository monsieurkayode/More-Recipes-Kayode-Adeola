import React, { Component } from 'react';

class SignupPage extends Component {
  render() {
    return (
      <div>
        <div className="navbar-fixed">
          <nav className="header">
            <div className="nav-wrapper">
              <a className="brand-logo return" href="index.html"><span className="fa fa-angle-left"></span> Back to More-Recipies</a>
              <a href="#" data-activates="navlink" className="button-collapse"><i className="material-icons">menu</i></a>         
              <ul className="right hide-on-med-and-down return">
                <li>
                  <a className="" href="login.html">Log In</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="row center-align">
          <div className="col s12 l6 m8 offset-l3 offset-m2">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <h5>Lorep ipsum dotae amet.....</h5>
              </div>
            </div>
          </div>
        </div>
        <div id="form" className="container">
          <div className="row">
            <form className="col l6 m8 s12 offset-l3 offset-m2">
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">email</i>
                  <input id="email" type="email" className="validate" required />
                  <label for="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">account_circle</i>
                  <input id="username" type="text" className="validate" required />
                  <label for="username" data-error="Username is invalid">Username</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock_outline</i>
                  <input id="password" type="password" className="validate" required />
                  <label for="password" data-error="Invalid password" data-success="Strong password">Password</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock</i>
                  <input id="confirm-password" type="password" className="validate" required />
                  <label for="confirm-password">Confirm Password</label>
                </div>
              </div>
              <div className="col s12 l12 m12 center-align">
                <button className="btn waves-effect waves-light white-text" type="submit" name="action">Submit
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </form>
          </div>
        </div>
        <ul className="side-nav" id="navlink">
          <li>
            <a href="login.html">Log In</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default SignupPage;