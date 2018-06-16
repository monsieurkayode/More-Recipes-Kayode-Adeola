/* eslint-disable no-undef */
import React from 'react';

import { Banner } from '../../../src/components/headers';


const setup = () => {
  const wrapper = mount(<Banner />);
  return {
    wrapper
  };
};

describe('The Banner Component', () => {
  it('should render correctly', (done) => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
    done();
  });
});
