/* eslint-disable no-undef */
import React from 'react';

import { Ingredients } from '../../../src/components/recipeview';
import data from '../../__mocks__/mockData';

const setup = () => {
  const props = {
    ingredients: data.recipeDetails.ingredients
  };

  const wrapper = shallow(<Ingredients {...props} />);

  return {
    wrapper
  };
};

const { wrapper } = setup();

describe('Ingredients', () => {
  it('should render correctly',
    (done) => {
      expect(toJson(wrapper)).toMatchSnapshot();
      done();
    });
});
