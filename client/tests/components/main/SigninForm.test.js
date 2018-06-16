/* eslint-disable no-undef */
import React from 'react';

import { SigninForm } from '../../../src/components/main/SigninForm';

const setup = (isAuthenticated) => {
  const props = {
    signinAction: jest.fn(),
    isAuthenticated,
    history: {
      goBack: jest.fn(),
      push: jest.fn()
    }
  };

  const wrapper = mount(<SigninForm {...props} />);

  return { wrapper, props };
};

const event = {
  target: {
    name: 'username',
    value: 'user'
  }
};

let { wrapper } = setup(false);

describe('SigninForm', () => {
  it('should render correctly',
    (done) => {
      expect(toJson(wrapper)).toMatchSnapshot();
      done();
    });

  it('should render a form for signining in',
    (done) => {
      expect(wrapper.find('form').exists()).toBe(true);
      done();
    });

  it('should have two input fields for username and password',
    (done) => {
      expect(wrapper.find('input').length).toEqual(2);
      done();
    });


  it('should call handleInputChange on form input changes',
    (done) => {
      wrapper.instance().handleInputChange(event);
      expect(wrapper.state().username).toBe('user');
      done();
    });

  it('should call handleSubmit on form submit',
    (done) => {
      const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
      wrapper
        .instance()
        .handleInputChange({
          target: { name: 'password', value: 'password' }
        });
      expect(wrapper.state().password).toBe('password');
      wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
      expect(handleSubmitSpy).toHaveBeenCalled();
      done();
    });

  describe('should redirect', () => {
    it('to the index page if sign in was successful', (done) => {
      wrapper.instance().componentWillUpdate({ isAuthenticated: true });
      done();
    });

    it('back to previous page if a user is already logged in', (done) => {
      const { props } = setup(true);
      wrapper = mount(<SigninForm {...props} />);
      expect(props.history.goBack.mock.calls.length).toBe(2);
      done();
    });
  });
});
