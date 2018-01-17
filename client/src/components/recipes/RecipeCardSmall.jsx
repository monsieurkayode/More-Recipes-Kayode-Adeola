import React, { Component } from 'react';

import { RecipeCard } from './';

class RecipeCardSmall extends Component {
  render() {
    return (
      <div className="col l3 m8 s12 offset-m2">
        <div className="card hoverable views-small">
          <RecipeCard size="small-cards" {...this.props} />
        </div>
      </div>
    );
  }
}

export default RecipeCardSmall;
