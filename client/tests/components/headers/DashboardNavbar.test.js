/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { DashboardNavbar } from '../../../src/components/headers';


const setup = (username) => {
  const props = {
    user: {
      username
    },
    logoutAction: jest.fn()
  };

  const wrapper = mount(
    <BrowserRouter>
      <DashboardNavbar {...props} />
    </BrowserRouter>
  );
  return {
    wrapper
  };
};

describe('The DashboardNavbar Component', () => {
  it('should render correctly', (done) => {
    const { wrapper } = setup('username');
    expect(toJson(wrapper)).toMatchSnapshot();
    done();
  });
});
