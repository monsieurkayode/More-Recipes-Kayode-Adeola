import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'proptypes';

import FileUpload from './FileUpload';
import Loader from './Loader';
import { editPost, fetchSingleRecipe, isFetching } from '../../actions';
import validate from '../../utils/validateRecipe';
import categories from '../../../../shared/categories';
import pascalCase from '../../utils/pascalCase';

/**
 * @summary - EditRecipe class declaration
 * @class EditRecipe
 * @extends {Component}
 */
export class EditRecipe extends Component {
  /**
   * Component constructor
   * @param {object} props
   * @memberOf EditRecipe
   */
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: '',
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
    const { recipeId } = this.props.match.params;
    $(('#category')).on('change', this.handleCategory);
    this.props.fetchSingleRecipe(recipeId);
  }

  /**
   * @method componentWillReceiveProps
   *
   * @param {object} nextProps
   *
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.initialValues.category) {
      this.setState({
        selectedCategory: nextProps.initialValues.category
      });
    }
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
   * @param {object} values
   * @param {string} category
   *
   * @returns {void}
   */
  onSubmit = (values, category) => {
    const { recipeId } = this.props.match.params;
    category = this.state.selectedCategory;
    this.props.isFetching(true, 'EditRecipe');
    this.props.editPost(recipeId, category, values, (message) => {
      this.props.history.goBack();
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
            <option value={this.state.selectedCategory}>Select Category</option>
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
    const { handleSubmit, invalid, initialValues, isLoading } = this.props;
    return (
      <div className="container">
        <div className="row">
          {isLoading ?
            <Loader /> :
            <form
              className="col l8 m8 s10 offset-s1 offset-m2 offset-l2"
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
                    {!!initialValues.image && initialValues.image.name }
                  </p>
                </span>
              </div>

              <div className="form-btn-control">
                <button
                  className="btn red"
                  onClick={() => this.props.history.push('/dashboard/recipes')}
                >
                Cancel
                </button>
                <button
                  disabled={invalid}
                  type="submit"
                  className="btn"
                >
                Update
                </button>
              </div>
            </form>}
        </div>
      </div>
    );
  }
}

EditRecipe.propTypes = {
  editPost: PropTypes.func.isRequired,
  fetchSingleRecipe: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.number,
    views: PropTypes.number,
    upvote: PropTypes.number,
    downvote: PropTypes.number,
    recipeName: PropTypes.string,
    category: PropTypes.string,
    ingredients: PropTypes.string,
    instructions: PropTypes.string,
    image: PropTypes.shape({})
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isFetching: PropTypes.func.isRequired
};

const mapStateToProps = ({ currentRecipe, isLoading }) => ({
  initialValues: {
    recipeName: currentRecipe.recipeName,
    category: currentRecipe.category,
    ingredients: currentRecipe.ingredients,
    instructions: currentRecipe.instructions,
    image: {
      file: 'empty',
      name: currentRecipe.image
    }
  },
  isLoading: isLoading.editRecipeIsLoading
});

export default compose(
  connect(mapStateToProps, { editPost, fetchSingleRecipe, isFetching }),
  reduxForm({
    validate,
    form: 'EditRecipeForm',
    enableReinitialize: true,
  }),
)(EditRecipe);
