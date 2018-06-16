/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { LandingNavbar } from '../../../src/components/headers';


const setup = () => {
  const wrapper = mount(
    <BrowserRouter>
      <LandingNavbar />
    </BrowserRouter>
  );
  return {
    wrapper
  };
};

describe('The LandingNavbar Component', () => {
  it('should render correctly', (done) => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
    done();
  });
});
