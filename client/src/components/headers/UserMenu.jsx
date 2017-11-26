import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'proptypes';

const UserMenu = (props => (
  <ul id="user-dropdown" className="dropdown-content">
    <li>
      <Link
        to="/recipes/new"
      >
        <span className="fa fa-lg fa-pencil-square-o" /> New Post
      </Link>
    </li>
    <li>
      <Link to="/dashboard"><span className="fa fa-lg fa-wrench" /> Dashboard
      </Link>
    </li>
    <li className="divider" />
    <li onClick={props.logoutAction}>
      <a>
        <span className="fa fa-lg fa-lock" /> Logout
      </a>
    </li>
  </ul>
));

UserMenu.propTypes = {
  logoutAction: PropTypes.func.isRequired
};

export default UserMenu;
