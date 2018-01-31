import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'proptypes';
import Avatar from 'react-avatar';

import { logoutAction } from '../../actions';

import dash from '../../../assets/css/img/dash.jpg';


/**
   * SideNav
   * @function SideNav
   *
   * @param {object} props
   *
   * @returns {JSX} JSX
   */
const SideNav = props => (
  <div>
    <ul className="side-nav teal" id="navlink">
      <li>
        <div className="card-image">
          <img
            className="responsive-img"
            id="dash-img"
            src={dash}
            alt="user-background"
          />
          <div id="side-nav-avatar">
            <Avatar
              className="responsive-img"
              name={props.username}
              size={80}
              color="#345"
              round
            />
          </div>
        </div>
      </li>
      <li>
        <Link className="white-text" to="/recipes/new" >
          <span className="fa fa-lg fa-plus-circle" /> Recipe
        </Link>
      </li>
      <li>
        <Link
          className="white-text"
          to="/dashboard/recipes"
        ><span className="fa fa-lg fa-dashboard" /> Dashboard
        </Link>
      </li>
      <li>
        <a className="white-text" onClick={props.logoutAction}>
          <span className="fa fa-lg fa-sign-out" /> Logout
        </a>
      </li>
    </ul>
  </div>
);

const mapStateToProps = ({ signinState }) => ({
  username: signinState.user.username
});

SideNav.defaultProps = {
  username: ''
};

SideNav.propTypes = {
  logoutAction: PropTypes.func.isRequired,
  username: PropTypes.string,
};

export default connect(mapStateToProps, { logoutAction })(SideNav);
