/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import Authenticate from '../../src/utils/Authenticate';
import Footer from '../../src/components/footer';

const setup = (isAuthenticated) => {
  const props = {
    isAuthenticated,
    history: {
      push: jest.fn()
    }
  };

  const store = mockStore({
    signinState: {
      user: {
        username: 'user'
      }
    },
    isAuthenticated
  });


  const Component = () => <Footer />;

  Component.displayName = 'FooterComponent';

  const RequireAuthComponent = Authenticate(Component);

  const wrapper = mount(
    <Provider store={store}>
      <RequireAuthComponent {...props} />
    </Provider>
  );

  return { wrapper };
};

const { wrapper } = setup(true);

describe('Authenticate', () => {
  it('should return a component', () => {
    expect(wrapper.find('Connect(Authenticate)')).toHaveLength(1);
  });

  it('should render passed component if user is authenticated',
    (done) => {
      expect(toJson(wrapper)).toMatchSnapshot();
      expect(wrapper.find('FooterComponent')).toHaveLength(1);
      done();
    });
});
