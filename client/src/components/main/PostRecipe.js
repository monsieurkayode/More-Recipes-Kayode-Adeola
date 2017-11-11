import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import FileUpload from './FileUpload';
import { createPost } from '../../actions';

class PostRecipe extends Component {
  renderInput(field) {
    const { label, input, meta, type } = field;
    return (
      <div className="row">
        <div className="input-field col-s12 l12 m12">
          <input 
            type={type}
            { ...input }
          />
          {label === 'Ingredients' ? 
          <div>
            <button 
              className="btn blue right"
              >Add More</button></div> : ''}
          <label className='active'>{label}</label>
        </div>
        <div className="red-text">
          {meta.touched ? meta.error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
      window.location.reload();
    });
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="container">
        <div className="row">
          <form
            className="col l6 m8 s12 offset-l3 offset-m2"
            onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              type='text'
              className=''
              label='Recipe Name'
              name='recipeName'
              component={this.renderInput}
            />

            <Field
              type='text'
              className=''
              label='Category'
              name='category'
              component={this.renderInput}
            />

            <Field
              type='text'
              className=''
              label='Ingredients'
              name='ingredients'
              component={this.renderInput}
            />

            <Field
              type='text'
              className='materialize-textarea'
              label='Intsructions'
              name='instructions'
              component={this.renderInput}
            />
            <div>
              <Field
                name='image'
                component={FileUpload}
              />
            </div>
            
            <span className="right"> 
              <button disabled={submitting} type='submit' className="btn">Post</button>
            </span>
            <Link to='/' className="right">
              <button className="btn red">Cancel</button>
            </Link>
            
          </form>
        </div>
      </div>
      
    );
  }
}

const validate = values => {
  let errors = {};

  if (!values.recipeName) {
    errors.recipeName = 'Please enter a recipe name';
  }

  if (!values.ingredients) {
    errors.ingredients = 'Please enter some ingredients';
  }

  if (!values.instructions) {
    errors.instructions = 'Please enter some instructions';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'PostRecipeForm'
})(connect(null, { createPost })(PostRecipe))