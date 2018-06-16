/* eslint-disable no-undef */
import React from 'react';

import { Instructions } from '../../../src/components/recipeview';
import data from '../../__mocks__/mockData';

const setup = () => {
  const props = {
    ingredients: data.recipeDetails.instructions
  };

  const wrapper = shallow(<Instructions {...props} />);

  return {
    wrapper
  };
};

const { wrapper } = setup();

describe('Instructions', () => {
  it('should render correctly',
    (done) => {
      expect(toJson(wrapper)).toMatchSnapshot();
      done();
    });
});
