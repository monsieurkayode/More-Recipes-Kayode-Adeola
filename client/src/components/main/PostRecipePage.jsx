import React, { Component } from 'react';
import PropTypes from 'proptypes';

import { PostRecipe, SideNav } from './Index.jsx';
import { HomeNavbar } from '../headers/Index.jsx';

class PostRecipePage extends Component {
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
            <h5 className="teal-text">Create Recipe</h5>
          </div>
        </div>
        <PostRecipe history={this.props.history} />
        <SideNav />
      </div>
    );
  }
}

PostRecipePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
};

export default PostRecipePage;
