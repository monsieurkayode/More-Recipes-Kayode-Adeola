/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { DashboardPanel } from '../../../src/components/dashboard';


const setup = (username) => {
  const props = {
    user: {
      username
    }
  };
  const wrapper = mount(
    <BrowserRouter>
      <DashboardPanel {...props} />
    </BrowserRouter>
  );
  return {
    wrapper,
    props
  };
};

describe('The DashboardPanel Component', () => {
  it('should render correctly', (done) => {
    const { wrapper } = setup('username');
    expect(toJson(wrapper)).toMatchSnapshot();
    done();
  });
});
