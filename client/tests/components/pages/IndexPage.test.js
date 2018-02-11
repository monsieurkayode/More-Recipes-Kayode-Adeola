/* eslint-disable no-undef */
import React from 'react';

import { IndexPage } from '../../../src/components/pages/IndexPage';
import data from '../../__mocks__/mockData';


const setup = (user, isAuthenticated) => {
  const token = data.signinResponse.Token,
    props = {
      user,
      logoutAction: jest.fn(),
      fetchRecipesAction: jest.fn().mockImplementation(() => Promise.resolve()),
      fetchTopRecipes: jest.fn(),
      isAuthenticated
    };

  localStorage.setItem('token', token);
  localStorage.setItem('currentPage', 1);

  const wrapper = shallow(<IndexPage {...props} />);

  return {
    wrapper
  };
};

describe('The IndexPage Component', () => {
  it('should render correctly',
    (done) => {
      const { wrapper } = setup({ username: 'username' }, true);
      expect(toJson(wrapper)).toMatchSnapshot();
      done();
    });

  it('should have a state of isLoading to be true on mount',
    (done) => {
      const { wrapper } = setup({ username: 'username' }, true);
      expect(wrapper.state().isLoading).toBeTruthy();
      done();
    });

  it('should have a state of isLoading set to false after fetching recipes',
    (done) => {
      const { wrapper } = setup({ username: 'username' }, true);
      wrapper.setState({ isLoading: false });
      expect(wrapper.state().isLoading).toBeFalsy();
      done();
    });

  it('should render Homepage component if user is unauthenticated',
    (done) => {
      const { wrapper } = setup(null, false);
      wrapper.setState({ isLoading: false });
      expect(wrapper.find('Homepage').length).toEqual(1);
      done();
    });

  it('should not render Homepage component if user is authenticated',
    (done) => {
      const { wrapper } = setup(null, true);
      wrapper.setState({ isLoading: false });
      expect(wrapper.find('Homepage').length).toEqual(0);
      done();
    });

  it('should render Loader component only if isLoading state is true',
    (done) => {
      const { wrapper } = setup(null, true);
      expect(wrapper.find('Loader').length).toEqual(1);
      done();
    });
});
