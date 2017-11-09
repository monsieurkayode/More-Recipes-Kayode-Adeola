import React from 'react';
import { Link } from 'react-router-dom';

const UserMenu = (props => {
  return(
    <div>
      <li><Link to="/recipes/new"><span className="fa fa-lg fa-pencil-square-o"></span> New Post</Link></li>
      <li><Link to="/dashboard"><span className="fa fa-lg fa-wrench"></span> Dashboard</Link></li>
      <li className="divider"></li>
      <li onClick={props.logoutAction}><a><span className="fa fa-lg fa-lock"></span> Logout</a></li>
    </div>
  )
});

export default UserMenu;