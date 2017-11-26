import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'proptypes';

import FileUpload from './FileUpload.jsx';
import { createPost } from '../../actions';
import validate from '../../utils/validate';

class PostRecipe extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  renderInput = (field) => {
    const { label, input, meta, type } = field;
    return (
      <div className="row">
        <div className="input-field col-s12 l12 m12">
          <input
            type={type}
            {...input}
          />
          {label === 'Ingredients' ?
            <div>
              <button
                className="btn blue right"
              >Add More</button></div> : ''}
          <label htmlFor className="active">{label}</label>
        </div>
        <div className="red-text">
          {meta.touched ? meta.error : ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit, invalid } = this.props;
    return (
      <div className="container">
        <div className="row">
          <form
            className="col l6 m8 s12 offset-l3 offset-m2"
            onSubmit={handleSubmit(this.onSubmit)}
          >
            <Field
              type="text"
              className=""
              label="Recipe Name"
              name="recipeName"
              component={this.renderInput}
            />

            <Field
              type="text"
              className=""
              label="Category"
              name="category"
              component={this.renderInput}
            />

            <Field
              type="text"
              className=""
              label="Ingredients"
              name="ingredients"
              component={this.renderInput}
            />

            <Field
              type="text"
              className="materialize-textarea"
              label="Intsructions"
              name="instructions"
              component={this.renderInput}
            />
            <div>
              <Field
                name="image"
                component={FileUpload}
              />
            </div>

            <span className="right">
              <button disabled={invalid} type="submit" className="btn">
                Post
              </button>
            </span>
            <Link to="/" className="right">
              <button className="btn red">Cancel</button>
            </Link>

          </form>
        </div>
      </div>

    );
  }
}

PostRecipe.propTypes = {
  createPost: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired
};

export default reduxForm({
  validate,
  form: 'PostRecipeForm'
})(connect(null, { createPost })(PostRecipe));
