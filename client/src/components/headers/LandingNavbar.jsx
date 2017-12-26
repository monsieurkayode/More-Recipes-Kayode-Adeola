import React from 'react';
import { Link } from 'react-router-dom';

import { SearchBar } from './Index.jsx';

const LandingNavBar = () => (
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
            <Link to="/">
              <i className="fa fa-heart" /> Top Recipes
            </Link>
          </li>
          <li>
            <Link to="/recipes/new" id="new-post">
              <i className="fa fa-pencil-square-o" /> New Post
            </Link>
          </li>
          <li>
            <Link
              to="/signin"
              className="waves-effect waves-light btn navbtn"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="waves-effect waves-light btn navbtn"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default LandingNavBar;
