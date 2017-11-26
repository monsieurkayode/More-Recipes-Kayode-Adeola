import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'proptypes';

import { logoutAction } from '../../actions';
import { UserMenu, SearchBar } from './Index.jsx';

class HomeNavbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="header">
          <div className="nav-wrapper">
            <Link
              to="/"
              className="brand-logo font-effect-3d-float logo hide-on-small-only"
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
                <Link to="/"><i className="fa fa-heart" /> Top Recipes</Link>
              </li>
              <li>
                <Link to="/recipes/new" id="new-post">
                  <i className="fa fa-pencil-square-o" /> New Post
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
