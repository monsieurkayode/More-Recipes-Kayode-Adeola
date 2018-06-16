/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { HomeNavbar } from '../../../src/components/headers';


const setup = (username) => {
  const store = mockStore({
    signinState: {
      user: {
        username
      }
    }
  });
  const props = {
    user: store.getState().user,
    logoutAction: jest.fn()
  };

  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <HomeNavbar {...props} />
      </BrowserRouter>
    </Provider>
  );
  return {
    wrapper
  };
};

describe('The HomeNavbar Component', () => {
  it('should render correctly', (done) => {
    const { wrapper } = setup('username');
    expect(toJson(wrapper)).toMatchSnapshot();
    done();
  });
});
