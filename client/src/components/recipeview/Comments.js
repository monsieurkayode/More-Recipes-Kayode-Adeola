import React, { Component } from 'react';
import moment from 'moment';
import userImg from '../../assets/css/img/user.jpg';

class Comments extends Component {
  render() {
    let time = this.props.review.createdAt;
    time = moment.utc(new Date(time)).fromNow();
    return (
      <div id="comment-posts" className="row">
        <div className="col l10 offset-l1 m12 s12">
          <ul>
            <li>
              <img className="secondary-content circle left" src={userImg} height="40px" alt="" />
              <span className=""> <strong className="teal-text">{this.props.review.User.username}</strong> <span className="grey-text created-at"><br /> {time}</span></span>
            </li>
            <li>
              <p className="review">
                {this.props.review.comment}
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Comments;