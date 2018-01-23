import React from 'react';

import { RecipeCard } from './';

/**
 * RecipeCardSmall
 * @function RecipeCardSmall
 *
 * @param {object} props
 *
 * @return {JSX} JSX
 */
const RecipeCardSmall = props => (
  <div className="col l3 m8 s12 offset-m2">
    <div className="card hoverable views-small">
      <RecipeCard size="small-cards" {...props} />
    </div>
  </div>
);

export default RecipeCardSmall;
