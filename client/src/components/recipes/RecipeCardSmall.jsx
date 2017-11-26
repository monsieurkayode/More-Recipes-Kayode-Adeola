import React, { Component } from 'react';

import { RecipeCard } from './Index.jsx';

class RecipeCardSmall extends Component {
  render() {
    return (
      <div className="col l3 m8 s12 offset-m2">
        <div className="card views-small">
          <RecipeCard size="small-cards" />
        </div>
      </div>
    );
  }
}

export default RecipeCardSmall;
