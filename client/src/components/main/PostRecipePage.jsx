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
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <h5>Create Recipe Post</h5>
              </div>
            </div>
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
