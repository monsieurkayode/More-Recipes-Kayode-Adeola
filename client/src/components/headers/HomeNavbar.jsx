import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'proptypes';

import { logoutAction } from '../../actions';
import { UserMenu, SearchBar } from './';
import resetPage from '../../utils/resetPage';

class HomeNavbar extends Component {
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
              data-activates="navlink"
              className="button-collapse"
            >
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <SearchBar />
              </li>
              <li>
                <Link to="/" onClick={resetPage}>
                  <i className="fa fa-home" /> Home
                </Link>
              </li>
              <li>
                <Link to="/recipes/new" id="new-post">
                  <i className="fa fa-pencil-square-o" /> Add Recipe
                </Link>
              </li>
              <li className="right hide-on-med-and-down return">
                <a className="dropdown-button" data-activates="user-dropdown">
                  <span
                    className="fa fa-lg fa-user-circle"
                  /> {this.props.user.username} <span
                    className="fa fa-lg fa-caret-down"
                  />
                </a>
                <UserMenu {...this.props} />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({ signinState }) => ({ user: signinState.user });

HomeNavbar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string
  }).isRequired
};

export default connect(mapStateToProps, { logoutAction })(HomeNavbar);
