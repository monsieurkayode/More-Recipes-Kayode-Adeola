/* eslint-disable no-undef */
import React from 'react';

import { SignupForm } from '../../../src/components/main/SignupForm';

const setup = (isAuthenticated) => {
  const props = {
    signupAction: jest.fn().mockImplementation(() => Promise.resolve()),
    isAuthenticated,
    history: {
      goBack: jest.fn(),
      push: jest.fn()
    }
  };

  const wrapper = mount(<SignupForm {...props} />);

  return { wrapper, props };
};

const simulateInput = (name, value) => {
  const event = {
    target: {
      name,
      value
    }
  };
  return event;
};

let { wrapper } = setup(false);

describe('SignupForm', () => {
  it('should render correctly',
    (done) => {
      expect(toJson(wrapper)).toMatchSnapshot();
      done();
    });

  it('should render a form for creating a new account',
    (done) => {
      expect(wrapper.find('form').exists()).toBe(true);
      done();
    });

  it('should have four input fields',
    (done) => {
      expect(wrapper.find('input').length).toEqual(4);
      done();
    });


  it('should have state of all form fields to be an empty string',
    (done) => {
      expect(wrapper.state().username).toBe('');
      expect(wrapper.state().email).toBe('');
      expect(wrapper.state().password).toBe('');
      expect(wrapper.state().confirmPassword).toBe('');
      done();
    });

  it('should have state of errors to be an empty object',
    (done) => {
      expect(wrapper.state().errors).toEqual({});
      done();
    });

  it('should return errors when trying to submit an empty form',
    (done) => {
      wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
      expect(wrapper.instance().isValid()).toBe(false);
      expect(wrapper.state().errors).toEqual({
        username: 'Username is invalid',
        email: 'Email is required',
        password: 'Password too weak',
        confirmPassword: 'Confirm password'
      });
      done();
    });

  describe('username validation', () => {
    it('should return error if provided username length is less than three',
      (done) => {
        wrapper.instance().handleInputChange(simulateInput('username', 'us'));
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        expect(wrapper.state().username).toEqual('us');
        expect(wrapper.state().errors.username).toBe('Username too short');
        done();
      });

    it('should return error if provided username is not alphanumeric',
      (done) => {
        wrapper.instance().handleInputChange(simulateInput('username', '@re!'));
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        expect(wrapper.state().errors.username).toBe('Username is invalid');
        done();
      });

    it('should accept alphanumeric username with minimum of 3 characters',
      (done) => {
        wrapper.instance().handleInputChange(simulateInput('username', 'user'));
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        expect(wrapper.state().errors.username).toBeUndefined();
        done();
      });
  });

  describe('email validation', () => {
    it('should return error if provided email is invalid',
      (done) => {
        wrapper.instance().handleInputChange(simulateInput('email', 'us@com'));
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        expect(wrapper.state().errors.email).toBe('Email is invalid');
        done();
      });

    it('should accept valid email address',
      (done) => {
        wrapper
          .instance()
          .handleInputChange(simulateInput('email', 'user@gmail.com'));
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        expect(wrapper.state().errors.email).toBeUndefined();
        done();
      });
  });

  describe('password validation', () => {
    it('should return error if provided password length is less than six',
      (done) => {
        wrapper.instance().handleInputChange(simulateInput('password', 'pas'));
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        expect(wrapper.state().errors.password).toBe('Password too weak');
        done();
      });

    it('should return error if password and confirmPassword does not match',
      (done) => {
        wrapper
          .instance()
          .handleInputChange(simulateInput('password', 'password'));
        wrapper
          .instance()
          .handleInputChange(simulateInput('confirmPassword', 'passrd'));
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        expect(wrapper.state().errors.confirmPassword)
          .toBe('Passwords does not match');
        done();
      });

    it('should accept password length of six characters and above',
      (done) => {
        wrapper
          .instance()
          .handleInputChange(simulateInput('password', 'password'));
        wrapper
          .instance()
          .handleInputChange(simulateInput('confirmPassword', 'password'));
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        expect(wrapper.state().errors.password).toBeUndefined();
        done();
      });
  });

  describe('should redirect', () => {
    it('back to previous page if a user is already logged in', (done) => {
      const { props } = setup(true);
      wrapper = mount(<SignupForm {...props} />);
      expect(props.history.goBack.mock.calls.length).toBe(2);
      done();
    });
  });
});
