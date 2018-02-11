/* eslint-disable no-undef */
import React from 'react';

import { DashboardPage } from '../../../src/components/pages/DashboardPage';

const componentDidMountSpy = jest
    .spyOn(DashboardPage.prototype, 'componentDidMount'),
  renderSpy = jest.spyOn(DashboardPage.prototype, 'render');

const setup = (route, isLoading) => {
  const props = {
    user: {},
    isLoading,
    isFetching: jest.fn(),
    deletePost: jest.fn(),
    removeFavorite: jest.fn(),
    fetchUserRecipes: jest.fn(),
    isLoadingRecipes: isLoading,
    fetchUserFavorites: jest.fn(),
    isLoadingFavorites: isLoading,
    match: {
      params: {
        route
      }
    }
  };

  localStorage.setItem('currentPageUserRecipes', 1);
  localStorage.setItem('currentPageUserFavorites', 1);

  const wrapper = shallow(<DashboardPage {...props} />);

  return {
    wrapper,
    props
  };
};

describe('The DashboardPage Component', () => {
  it('should render correctly',
    (done) => {
      const { wrapper } = setup('profile', false);
      expect(toJson(wrapper)).toMatchSnapshot();
      done();
    });

  it('should call componentDidMount method',
    (done) => {
      expect(componentDidMountSpy).toHaveBeenCalled();
      done();
    });

  it('should call componentDidUpdate method',
    (done) => {
      expect(componentDidMountSpy).toHaveBeenCalled();
      done();
    });

  it('should call render method',
    (done) => {
      expect(renderSpy).toHaveBeenCalled();
      done();
    });
});
