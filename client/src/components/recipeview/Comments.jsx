import React, { Component } from 'react';
import userImg from '../../css/img/user.jpg';

class Comments extends Component {
  render() {
    return (
      <div id="comment-posts" className="row">
        <div className="col l10 offset-l1 m12 s12">
          <ul>
            <li>
              <img className="secondary-content circle left" src={userImg} height="40px" alt="" />
              <span className=""> <strong className="teal-text">Kayode Adeola</strong> <span className="grey-text created-at"><br /> August 23, 2017 8:52pm</span></span>
            </li>
            <li>
              <p className="review">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
              <span className="secondary-content btn btn-flat">Reply</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Comments;