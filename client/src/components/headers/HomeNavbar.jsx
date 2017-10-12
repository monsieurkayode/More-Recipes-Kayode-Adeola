import React from 'react';
import { Link } from 'react-router';

import { UserMenu, SearchBar } from './Index';

const HomeNavbar = (props => {
  return(
    <div className="navbar-fixed">
      <nav className="header">
        <div className="nav-wrapper">
          <Link to="" className="brand-logo font-effect-3d-float logo hide-on-small-only">More-Recipes</Link>
          <a href="" data-activates="navlink" className="button-collapse"><i className="material-icons">menu</i></a>         
          <ul className="right hide-on-med-and-down">
            <li>
              <SearchBar />
            </li>
            <li>
              <a><i className="fa fa-heart"></i> Top Recipes</a>
            </li>
            <li>
              <a href="#modal-newpost" id="new-post" className="modal-trigger"><i className="fa fa-pencil-square-o"></i> New Post</a>
            </li>
            <li className="right hide-on-med-and-down return">
              <a className="dropdown-button" href="" data-activates="user-dropdown"><span className="fa fa-lg fa-user-circle"></span> Kayode Adeola <span className="fa fa-lg fa-caret-down"></span></a>
            </li>
          </ul>
        </div>
      </nav>
      <UserMenu />
    </div>
  )
})

export default HomeNavbar;