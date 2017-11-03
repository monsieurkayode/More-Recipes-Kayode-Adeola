import React, { Component } from 'react';
import { PostRecipe } from './Index';
import { HomeNavbar } from '../headers/Index';

class PostRecipePage extends Component {
  render() {
    return (
      <div>
        <HomeNavbar onClick={this.props.logoutAction} />
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
    </div>
    );
  }
}

export default PostRecipePage;