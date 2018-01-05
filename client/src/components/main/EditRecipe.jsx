import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'proptypes';
import showdown from 'showdown';

import FileUpload from './FileUpload.jsx';
import { editPost, fetchSingleRecipe } from '../../actions';
import validate from '../../utils/validate';
import categories from '../../../../server/helpers/categories';
import pascalCase from '../../utils/pascalCase';

showdown.setFlavor('github');

class EditRecipe extends Component {
  constructor() {
    super();
    this.state = {
      selectedCategory: 'others',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const { recipeId } = this.props.match.params;
    this.props.fetchSingleRecipe(recipeId);
  }

  componentDidMount() {
    // eslint-disable-next-line
    $(findDOMNode(this.refs.category))
      .on('change', this.handleCategory);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialValues.category) {
      this.setState({
        selectedCategory: nextProps.initialValues.category
      });
    }
  }

  componentWillUpdate() {
    $('select').material_select();
  }

  onSubmit(values, category) {
    const { recipeId } = this.props.match.params;
    category = this.state.selectedCategory;
    this.props.editPost(recipeId, category, values, (message) => {
      Materialize.toast(message, 4000, 'grey darken-2');
      this.props.history.goBack();
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
              ref="category"
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
                Update
              </button>
            </span>
            <a onClick={() => this.props.history.goBack} className="right">
              <button className="btn red">Cancel</button>
            </a>
          </form>
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
  }).isRequired
};

const mapStateToProps = ({ currentRecipe }) => ({
  initialValues: {
    recipeName: currentRecipe.recipeName,
    category: currentRecipe.category,
    ingredients: currentRecipe.ingredients,
    instructions: currentRecipe.instructions,
    image: {
      file: 'empty',
      name: currentRecipe.image
    }
  }
});

export default compose(
  connect(mapStateToProps, { editPost, fetchSingleRecipe }),
  reduxForm({
    validate,
    form: 'EditRecipeForm',
    enableReinitialize: true,
  }),
)(EditRecipe);
