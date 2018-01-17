import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'proptypes';

import { UserMenu } from './';
import resetPage from '../../utils/resetPage';

class DashboardNavbar extends Component {
  render() {
    const brandClass = 'brand-logo font-effect-3d-float logo';
    return (
      <div className="navbar-fixed">
        <nav className="header">
          <div className="nav-wrapper">
            <Link
              to="/"
              onClick={resetPage}
              className={`${brandClass} hide-on-small-only`}
            >
              More-Recipes
            </Link>
            <a
              href=""
              data-activates="dashboard"
              className="button-collapse"
            >
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down return">
              <li>
                <a className="dropdown-button" data-activates="user-dropdown">
                  <span
                    className="fa fa-lg fa-user-circle"
                  /> {this.props.user.username} <span
                    className="fa fa-lg fa-caret-down"
                  />
                </a>
                <UserMenu logoutAction={this.props.logoutAction} />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

DashboardNavbar.defaultProps = {
  user: {}
};

DashboardNavbar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string
  }),
  logoutAction: PropTypes.func.isRequired
};

export default DashboardNavbar;
