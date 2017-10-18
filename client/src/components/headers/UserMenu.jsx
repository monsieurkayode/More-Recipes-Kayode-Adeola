import React from 'react';
import { Link } from 'react-router-dom';

const UserMenu = (props => {
  return(
    <ul id="user-dropdown" className="dropdown-content">
      <li><a className="modal-trigger" href="#modal-newpost"><span className="fa fa-lg fa-pencil-square-o"></span> New Post</a></li>
      <li><Link to="/dashboard"><span className="fa fa-lg fa-wrench"></span> Dashboard</Link></li>
      <li className="divider"></li>
      <li onClick={props.onClick}><Link to="/"><span className="fa fa-lg fa-lock"></span> Logout</Link></li>
    </ul>
  )
});

export default UserMenu;