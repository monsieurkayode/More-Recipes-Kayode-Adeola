/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { RecipeCard } from '../../../src/components/recipes';
import data from '../../__mocks__/mockData';


const setup = (size, selected) => {
  const selectRecipe = jest.fn();
  const props = {
    size,
    recipe: data.recipeDetails,
    selected,
    selectRecipe
  };

  const wrapper = mount(
    <BrowserRouter>
      <RecipeCard {...props} />
    </BrowserRouter>
  );
  return {
    wrapper,
    props
  };
};

describe('The RecipeCard Component', () => {
  it('should render correctly', (done) => {
    const { wrapper, props } = setup('small-cards', 'recipes');
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('.delete').simulate('click');
    expect(props.selectRecipe.mock.calls.length).toBe(1);
    done();
  });
});
