import React, { Component } from 'react';

class RecipePostModal extends Component {
  render() {
    const heading = this.props.check === 'edit' ? 'Edit Recipe' : 'Create New recipe';
    return (
      <div className="modal-content">
        <div className="row">
          <div className="card-panel center-align teal-text z-depth-0">
            <h5>{heading}</h5>
          </div>
          <form className="col s12 l12">
            <div className="row">
              <div className="input-field col-s12 l12 m12">
                <input id="recipe-name" type="text" className="validate" />
                <label className="active" htmlFor="recipe-name">Recipe Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col-s12 l12 m12">
                <input id="category" type="text" className="validate" />
                <label className="active" htmlFor="category">Category</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col-s12 l12 m12">
                <input id="new-ingredients" type="text" className="validate" />
                <label className="active" htmlFor="new-ingredients">Ingredients</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col-s12 l12 m12">
                <textarea id="instructions" className="materialize-textarea"></textarea>
                <label className="active" htmlFor="instructions">Instructions</label>
              </div>
            </div>
            <div className="file-field input-field">
              <div className="btn">
                <span>Upload Image</span>
                <input type="file" />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RecipePostModal;