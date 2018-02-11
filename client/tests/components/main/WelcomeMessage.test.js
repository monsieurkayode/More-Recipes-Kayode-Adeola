/* eslint-disable no-undef */
import React from 'react';

import { WelcomeMessage } from '../../../src/components/main';


const setup = () => {
  const wrapper = mount(<WelcomeMessage />);
  return {
    wrapper
  };
};

describe('The WelcomeMessage Component', () => {
  it('should render correctly', (done) => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
    done();
  });
});
