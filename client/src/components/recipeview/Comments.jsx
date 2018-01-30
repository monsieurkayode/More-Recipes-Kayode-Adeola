import React from 'react';
import PropTypes from 'proptypes';
import moment from 'moment';
import Avatar from 'react-avatar';

import pascalCase from '../../utils/pascalCase';

const Comments = ({ review }) => {
  let time = review.createdAt;
  time = moment.utc(new Date(time)).fromNow();
  return (
    <div className="review-container z-depth-2">
      <div className="review-body">
        <div className="user-avatar">
          <Avatar
            className="responsive-img"
            name={review.User.username}
            size={60}
            round
          />
        </div>
        <div className="review-content-block">
          <div>
            <p className="username">{pascalCase(review.User.username)}</p>
            <p className="review-time">{time}</p>
          </div>
          <div className="review-text">
            <p>{review.comment}</p>
          </div>
          <div className="review-controls">
            <i className="fa fa-pencil"> <span>Edit</span> </i>
            <i className="fa fa-trash"> <span>Delete</span></i>
          </div>
        </div>
      </div>
    </div>
  );
};

Comments.propTypes = {
  review: PropTypes.shape({
    comment: PropTypes.string,
    createdAt: PropTypes.string,
    User: PropTypes.shape({
      username: PropTypes.string
    })
  }).isRequired
};

export default Comments;
