/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';

import { WelcomeDisplay } from '../../../src/components/dashboard';


const setup = (username, selected) => {
  const store = mockStore({
    signinState: {
      user: {
        username
      }
    }
  });
  const props = {
    user: store.getState().user,
    selected
  };
  const wrapper = mount(
    <Provider store={store}>
      <WelcomeDisplay {...props} />
    </Provider>
  );
  return {
    wrapper
  };
};

describe('The WelcomeDisplay Component', () => {
  it('should render correctly', (done) => {
    const { wrapper } = setup('username', 'recipes');
    expect(toJson(wrapper)).toMatchSnapshot();
    done();
  });
});
