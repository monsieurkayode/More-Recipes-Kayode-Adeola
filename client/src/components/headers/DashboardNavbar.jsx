import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { UserMenu } from './Index';

class DashboardNavbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="header">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo font-effect-3d-float logo hide-on-small-only">More-Recipies</Link>
            <a href="" data-activates="dashboard" className="button-collapse"><i className="material-icons">menu</i></a>         
            <ul className="right hide-on-med-and-down return">
              <li>
                <a className="dropdown-button" href="" data-activates="user-dropdown"><span className="fa fa-lg fa-user-circle"></span> Kayode Adeola <span className="fa fa-lg fa-caret-down"></span></a>
              </li>
            </ul>
          </div>
        </nav>
        <UserMenu onClick={this.props.onClick}/>
      </div>
    );
  }
}

export default DashboardNavbar;