import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'proptypes';

/**
 * UserMenu
 * @function UserMenu
 *
 * @param {object} props
 *
 * @returns {JSX} JSX
 */
const UserMenu = props => (
  <ul id="user-dropdown" className="dropdown-content">
    <li>
      <Link
        to="/recipes/new"
      >
        <span className="fa fa-lg fa-plus-circle" /> Recipe
      </Link>
    </li>
    <li>
      <Link
        to="/dashboard/recipes"
      ><span className="fa fa-lg fa-dashboard" /> Dashboard
      </Link>
    </li>
    <li className="divider" />
    <li>
      <a onClick={props.logoutAction}>
        <span className="fa fa-lg fa-sign-out" /> Logout
      </a>
    </li>
  </ul>
);

UserMenu.propTypes = {
  logoutAction: PropTypes.func.isRequired
};

export default UserMenu;
