/* eslint-disable no-undef */
import React from 'react';

import { HomePage } from '../../../src/components/pages';

const setup = () => {
  const wrapper = shallow(<HomePage />);

  return {
    wrapper
  };
};

describe('The HomePage Component', () => {
  it('should render correctly',
    (done) => {
      const { wrapper } = setup();
      expect(toJson(wrapper)).toMatchSnapshot();
      done();
    });
});
