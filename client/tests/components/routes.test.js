/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';

import Routes from '../../src/routes';

const setup = () => {
  const store = mockStore({});
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Routes />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
  return {
    wrapper
  };
};

describe('The Routes Component', () => {
  it('should render correctly', (done) => {
    const { wrapper } = setup('username', 'recipes');
    expect(toJson(wrapper)).toMatchSnapshot();
    done();
  });
});
