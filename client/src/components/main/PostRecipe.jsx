import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'proptypes';
import showdown from 'showdown';
import _ from 'lodash';

import FileUpload from './FileUpload.jsx';
import { createPost } from '../../actions';
import validate from '../../utils/validate';
import categories from '../../../../server/helpers/categories';
import pascalCase from '../../utils/pascalCase';

showdown.setFlavor('github');
class PostRecipe extends Component {
  constructor() {
    super();
    this.state = {
      showIngredients: false,
      showInstructions: false,
      selectedCategory: 'others',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // $('select').material_select();
    // $('select').material_select('onChange', this.handleCategory.bind(this));
    $(findDOMNode(this.refs.category)).on('change', this.handleCategory);
  }

  componentWillReceiveProps() {
    if (!_.has(this.props.errors, 'ingredients')) {
      this.setState({ showIngredients: true });
    } else {
      this.setState({ showIngredients: false });
    }
    if (!_.has(this.props.errors, 'instructions')) {
      this.setState({ showInstructions: true });
    } else {
      this.setState({ showInstructions: false });
    }
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

  previewIngredients = () => {
    const converter = new showdown.Converter();
    if (!_.has(this.props.errors, 'ingredients')) {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: converter.makeHtml(this.props.values.ingredients) }}
        />
      );
    }
  }

  previewInstructions = () => {
    const converter = new showdown.Converter();
    if (!_.has(this.props.errors, 'instructions')) {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: converter.makeHtml(this.props.values.instructions) }}
        />
      );
    }
  }

  renderInput = (field) => {
    const { label, input, meta, type, className, placeholder } = field;
    return (
      <div className="row">
        <div className="input-field col-s12 l12 m12"> <input
          type={type}
          placeholder={placeholder}
          {...input}
          className={className}
        />
          <label htmlFor className="active">{label}</label>
        </div>
        <div className="red-text">
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
        <div className="red-text">
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
    const { showIngredients, showInstructions } = this.state;
    return (
      <div className="container">
        <div className="row">
          <form
            className="col l6 m8 s12 offset-m2"
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
              <button disabled={invalid} type="submit" className="btn">
                Post
              </button>
            </span>
            <Link to="/" className="right">
              <button className="btn red">Cancel</button>
            </Link>
          </form>
          {showIngredients && <div id="markdown" className="col l6">
            {this.previewIngredients()}
          </div>}
          {showInstructions && <div id="markdown" className="col l6" style={{ marginTop: '10px' }}>
            {this.previewInstructions()}
          </div>}
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

const mapStateToProps = ({ form }) => ({
  values: form.PostRecipeForm.values,
  errors: form.PostRecipeForm.syncErrors
});

export default reduxForm({
  validate,
  form: 'PostRecipeForm'
})(connect(mapStateToProps, { createPost })(PostRecipe));
