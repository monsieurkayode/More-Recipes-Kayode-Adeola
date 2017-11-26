import React, { Component } from 'react';

class CommentBox extends Component {
  render() {
    return (
      <div id="comment-box" className="row">
        <div className="col l10 m12 s12 offset-l1">
          <form>
            <div className="input-field">
              <textarea
                className="materialize-textarea"
                id="reviews"
                type="text"
                placeholder=" Add a comment.."
              />
            </div>
            <a id="post-btn" className="btn btn-flat right" href="/">Post</a>
          </form>
        </div>
      </div>
    );
  }
}

export default CommentBox;
