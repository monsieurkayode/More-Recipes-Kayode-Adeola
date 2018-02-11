/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { RecipeCardSmall } from '../../../src/components/recipes';
import data from '../../__mocks__/mockData';

const setup = (selected) => {
  const props = {
    recipe: data.recipeDetails,
    selectRecipe: jest.fn(),
    selected
  };
  const wrapper = mount(
    <BrowserRouter>
      <RecipeCardSmall {...props} />
    </BrowserRouter>
  );
  return {
    wrapper
  };
};

describe('The RecipeCardSmall Component', () => {
  it('should render correctly', (done) => {
    const { wrapper } = setup('recipes');
    expect(toJson(wrapper)).toMatchSnapshot();
    done();
  });
});
