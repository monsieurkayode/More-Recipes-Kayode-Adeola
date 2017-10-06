import React, { Component } from 'react';
import { Category, Recipes, TopRecipes } from './Index';

class Contents extends Component {
  render() {
    return (
      <div className="row">
        <Category>
          {this.props.children}
        </Category>
        <Recipes>
          {this.props.children}
        </Recipes>
        <TopRecipes>
          {this.props.children}
        </TopRecipes>
      </div>
    );
  }
}

export default Contents;