import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'proptypes';
import showdown from 'showdown';

import FileUpload from './FileUpload.jsx';
import { createPost } from '../../actions';
import validate from '../../utils/validate';
import categories from '../../../../shared/categories';
import pascalCase from '../../utils/pascalCase';

showdown.setFlavor('github');
class PostRecipe extends Component {
  constructor() {
    super();
    this.state = {
      selectedCategory: 'others',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line
    $(findDOMNode(this.category))
      .on('change', this.handleCategory);
  }

  componentWillUpdate() {
    $('select').material_select();
  }

  onSubmit(values) {
    const category = this.state.selectedCategory;
    this.props.createPost(category, values, () => {
      this.props.history.push('/');
    });
  }

  handleCategory = (event) => {
    this.setState({
      selectedCategory: event.target.value
    });
  }

  renderInput = (field) => {
    const { label, input, meta, type, className, placeholder } = field;
    return (
      <div className="row">
        <div className="input-field col-s12 l12 m12">
          <input
            type={type}
            placeholder={placeholder}
            {...input}
            className={className}
          />
          <label htmlFor className="active">{label}</label>
        </div>
        <div className="red-text right">
          {meta.touched ? meta.error : ''}
        </div>
      </div>
    );
  }

  renderTextArea = (field) => {
    const { label, input, meta, type, className, placeholder } = field;
    return (
      <div className="row">
        <div className="input-field col-s12 l12 m12">
          <textarea
            placeholder={placeholder}
            type={type}
            {...input}
            className={className}
          />
          <label htmlFor className="active">{label}</label>
        </div>
        <div className="red-text right">
          {meta.touched ? meta.error : ''}
        </div>
      </div>
    );
  }

  renderCategory = (field) => {
    const { value, ref } = field;
    return (
      <div className="row">
        <div className="input-field col-s12 l12 m12">
          <select
            ref={ref}
            value={value}
          >
            <option value="others">Select Category</option>
            {categories
              .map(
                category => (<option value={category} key={category}>
                  {pascalCase(category)}
                </option>)
              )
            }
          </select>
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
            className="col l8 m8 s12 offset-m2 offset-l2"
            onSubmit={handleSubmit(this.onSubmit)}
          >
            <Field
              type="text"
              className=""
              placeholder="Enter recipe name"
              label="Recipe Name"
              name="recipeName"
              component={this.renderInput}
            />

            <Field
              name="category"
              ref={(ref) => { this.category = ref; }}
              value={this.state.selectedCategory}
              component={this.renderCategory}
            />

            <Field
              type="text"
              placeholder="Markdown supported"
              className="materialize-textarea"
              label="Ingredients"
              name="ingredients"
              component={this.renderTextArea}
            />

            <Field
              type="text"
              placeholder="Markdown supported"
              className="materialize-textarea"
              label="Intsructions"
              name="instructions"
              component={this.renderTextArea}
            />
            <div>
              <Field
                name="image"
                component={FileUpload}
              />
            </div>

            <span className="right">
              <button
                style={{ marginLeft: 20 }}
                disabled={invalid}
                type="submit"
                className="btn"
              >
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

PostRecipe.defaultProps = {
  values: {},
  errors: {}
};

PostRecipe.propTypes = {
  createPost: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    recipeName: PropTypes.string,
    ingredients: PropTypes.string,
    instructions: PropTypes.string
  }),
  values: PropTypes.shape({
    ingredients: PropTypes.string,
    instructions: PropTypes.string
  }),
};

const mapStateToProps = ({ form }) => ({
  values: form.PostRecipeForm.values,
  errors: form.PostRecipeForm.syncErrors
});

export default reduxForm({
  validate,
  form: 'PostRecipeForm'
})(connect(mapStateToProps, { createPost })(PostRecipe));
