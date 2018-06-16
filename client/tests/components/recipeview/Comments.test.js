/* eslint-disable no-undef */
import React from 'react';

import { Comments } from '../../../src/components/recipeview';
import data from '../../__mocks__/mockData';

const setup = () => {
  const props = {
    review: data.fetchReviewsResponse.comments[0]
  };

  const wrapper = shallow(<Comments {...props} />);

  return {
    wrapper
  };
};

const { wrapper } = setup();

describe('Comments', () => {
  it('should render correctly',
    (done) => {
      expect(toJson(wrapper)).toMatchSnapshot();
      done();
    });
});
