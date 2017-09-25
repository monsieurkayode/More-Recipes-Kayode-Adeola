import React from 'react';

const LandingNavBar = (props => {
   return(
    <div className="navbar-fixed">
      <nav className="header">
        <div className="nav-wrapper">
          <a className="brand-logo font-effect-3d-float logo hide-on-small-only" href="index.html">More-Recipes</a>
          <a href="/" data-activates="navlink" className="button-collapse"><i className="material-icons">menu</i></a>         
          <ul className="right hide-on-med-and-down">
            <li>
              <form id="nav-search">
                <i><input className="teal-text white input-fa" type="search" placeholder="&#xf002; Search" /></i>
              </form>
            </li>
            <li>
              <a><i className="fa fa-heart"></i> Top Recipes</a>
            </li>
            <li>
              <a href="#modal-newpost" id="new-post" className="modal-trigger"><i className="fa fa-pencil-square-o"></i> New Post</a>
            </li>
            <li>
              <a className="waves-effect waves-light btn navbtn modal-trigger" href="#modal-login">Login</a>
            </li>
            <li>
              <a className="waves-effect waves-light btn navbtn modal-trigger" href="#modal-register">Sign Up</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
})

export default LandingNavBar;