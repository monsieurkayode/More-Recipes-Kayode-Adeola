import React from 'react';

const UserMenu = (props => {
  return(
    <ul id="user-dropdown" className="dropdown-content">
      <li><a className="modal-trigger" href="#modal-newpost"><span className="fa fa-lg fa-pencil-square-o"></span> New Post</a></li>
      <li><a href="dashboard.html"><span className="fa fa-lg fa-wrench"></span> Dashboard</a></li>
      <li className="divider"></li>
      <li><a href="index.html"><span className="fa fa-lg fa-lock"></span> Logout</a></li>
    </ul>
  )
});

export default UserMenu;