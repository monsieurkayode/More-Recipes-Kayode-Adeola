import React, { Component } from 'react';
import PropTypes from 'proptypes';

import { EditRecipe, SideNav } from '../main/Index.jsx';
import { HomeNavbar } from '../headers/Index.jsx';

class EditRecipePage extends Component {
  componentDidMount() {
    $('.dropdown-button').dropdown();
    $('.button-collapse').sideNav();
  }

  render() {
    return (
      <div>
        <HomeNavbar />
        <div className="row center-align">
          <div className="col s12 l6 m8 offset-l3 offset-m2">
            <h5 className="teal-text">Edit Recipe</h5>
          </div>
        </div>
        <EditRecipe history={this.props.history} match={this.props.match} />
        <SideNav />
      </div>
    );
  }
}

EditRecipePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    params: PropTypes.shape({
      recipeId: PropTypes.string.isRequired
    }).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
};

export default EditRecipePage;
