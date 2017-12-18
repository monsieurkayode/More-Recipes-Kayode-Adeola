import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'proptypes';

import { postReview } from '../../actions';
import validate from '../../utils/validateInput';

class CommentBox extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(comment) {
    const { id } = this.props.currentRecipe;
    const { reset } = this.props;
    this.props.postReview(id, comment)
      .then(() => reset());
  }

  renderCommentBox = (field) => {
    const { input } = field;
    return (
      <div className="input-field">
        <textarea
          {...input}
          className="materialize-textarea"
          id="reviews"
          type="text"
          placeholder=" Add a comment.."
        />
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div id="comment-box" className="row">
        <div className="col l7 m8 s12 offset-l4 offset-m4">
          <form
            onSubmit={handleSubmit(this.onSubmit)}
          >
            <Field
              name="comment"
              component={this.renderCommentBox}
            />
            <button
              id="post-btn"
              type="submit"
              className="btn btn-flat right"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    );
  }
}

CommentBox.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  postReview: PropTypes.func.isRequired,
  currentRecipe: PropTypes.shape({
    id: PropTypes.number
  }).isRequired,
  reset: PropTypes.func.isRequired
};

const mapStateToProps = ({ currentRecipe }) => ({ currentRecipe });

export default reduxForm({
  validate,
  form: 'PostCommentForm'
})(connect(mapStateToProps, { postReview })(CommentBox));
