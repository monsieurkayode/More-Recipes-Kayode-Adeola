import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'proptypes';

import FileUpload from './FileUpload';
import { Loader } from './';
import { createPost, isFetching } from '../../actions';
import validate from '../../utils/validateRecipe';
import categories from '../../../../shared/categories';
import pascalCase from '../../utils/pascalCase';
import resetPage from '../../utils/resetPage';

/**
 * @summary - PostRecipe class declaration
 * @class PostRecipe
 * @extends {Component}
 */
class PostRecipe extends Component {
  /**
   * Component constructor
   * @param {object} props
   * @memberOf PostRecipe
   */
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 'others',
      isLoading: false
    };
  }

  /**
   * @method componentDidMount
   *
   * @param {void} void
   *
   * @returns {void}
   */
  componentDidMount() {
    $(('#category')).on('change', this.handleCategory);
  }

  /**
   * @method componentWillUpdate
   *
   * @param {void} void
   *
   * @returns {void}
   */
  componentWillUpdate() {
    $('select').material_select();
  }

  /**
   * Handle submit
   *
   * @method onSubmit
   *
   * @param {void} void
   *
   * @returns {void}
   */
  onSubmit = () => {
    const category = this.state.selectedCategory;
    this.props.isFetching(true, 'PostRecipe');
    const values = this.props.values;
    this.props.createPost(category, values, (message) => {
      resetPage();
      this.props.history.push('/');
      setTimeout(() => Materialize.toast(message, 4000, 'grey darken-2'), 3000);
    });
  }

  /**
   * Handle category selection
   *
   * @method handleCategory
   *
   * @param {object} event
   *
   * @returns {void}
   */
  handleCategory = (event) => {
    this.setState({
      selectedCategory: event.target.value
    });
  }

  /**
   * @method renderInput
   *
   * @param {object} field
   *
   * @returns {JSX} JSX
   */
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

  /**
   * @method renderTextArea
   *
   * @param {object} field
   *
   * @returns {JSX} JSX
   */
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

  /**
   * @method renderCategory
   *
   * @param {object} field
   *
   * @returns {JSX} JSX
   */
  renderCategory = (field) => {
    const { value } = field;
    return (
      <div className="row">
        <div className="input-field col-s12 l12 m12">
          <select
            id="category"
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

  /**
   * Renders the component
   * @method render
   *
   * @returns {JSX} JSX
   */
  render() {
    const { handleSubmit, invalid, values, isLoading } = this.props;
    return (
      <div className="container">
        <div className="row">
          { isLoading ?
            <Loader /> :
            <form
              className="col l8 m8 s10 offset-m2 offset-l2 offset-s1"
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
                <span className="image-name">
                  <p>
                    {!!values.image && values.image.name}
                  </p>
                </span>
              </div>
              <div className="form-btn-control">
                <Link className="white-text" to="/">
                  <button className="btn red">Cancel</button>
                </Link>
                <button
                  disabled={invalid}
                  type="submit"
                  className="btn"
                >
                  Post
                </button>
              </div>
            </form>}
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
  isFetching: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = ({ form, isLoading }) => ({
  values: form.PostRecipeForm.values,
  errors: form.PostRecipeForm.syncErrors,
  isLoading: isLoading.postRecipeIsLoading
});

export default reduxForm({
  validate,
  form: 'PostRecipeForm'
})(connect(mapStateToProps, { createPost, isFetching })(PostRecipe));
