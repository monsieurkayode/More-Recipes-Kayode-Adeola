import React, { Component } from 'react';

import { UserMenu } from './Index';

class DashboardNavbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="header">
          <div className="nav-wrapper">
            <a className="brand-logo font-effect-3d-float logo hide-on-small-only" href="loginaction.html">More-Recipies</a>
            <a href="#" data-activates="dashboard" className="button-collapse"><i className="material-icons">menu</i></a>         
            <ul className="right hide-on-med-and-down return">
              <li>
                <a className="dropdown-button" href="#" data-activates="user-dropdown"><span className="fa fa-lg fa-user-circle"></span> Kayode Adeola <span className="fa fa-lg fa-caret-down"></span></a>
              </li>
            </ul>
          </div>
        </nav>
        <UserMenu />
      </div>
    );
  }
}

export default DashboardNavbar;