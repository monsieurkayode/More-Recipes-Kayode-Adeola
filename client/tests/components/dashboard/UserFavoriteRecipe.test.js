/* eslint-disable no-undef */
import React from 'react';

import { UserFavoriteRecipe } from '../../../src/components/dashboard';
import data from '../../__mocks__/mockData';

const renderSpy = jest.spyOn(UserFavoriteRecipe.prototype, 'render');
const componentWillReceivePropsSpy = jest
  .spyOn(UserFavoriteRecipe.prototype, 'componentWillReceiveProps');
const setPaginationSpy = jest
  .spyOn(UserFavoriteRecipe.prototype, 'setPagination');
const handlePageSpy = jest
  .spyOn(UserFavoriteRecipe.prototype, 'handlePageClick');

const setup = (isLoadingFavorites) => {
  const props = {
    userFavorites: {
      recipes: {
        1: data.fetchRecipesResponse.recipes[0]
      },
      pagination: data.fetchRecipesResponse.pagination,
    },
    isFetching: jest.fn(),
    selected: 'favorites',
    selectRecipe: jest.fn(),
    isLoadingFavorites,
    fetchUserFavorites: jest.fn()
  };

  localStorage.setItem('currentPageUserFavorites', 1);

  const wrapper = shallow(<UserFavoriteRecipe {...props} />);

  return {
    wrapper,
    props
  };
};

const { wrapper } = setup(false);

describe('UserFavoriteRecipe', () => {
  it('should call render method',
    (done) => {
      expect(renderSpy).toHaveBeenCalled();
      done();
    });

  it('should render correctly',
    (done) => {
      expect(toJson(wrapper)).toMatchSnapshot();
      done();
    });

  it('should have a pagination component for page navigation', (done) => {
    expect(wrapper.find('.pagination-container').exists()).toBe(true);
    done();
  });

  it('should call setPagination', (done) => {
    expect(setPaginationSpy).toHaveBeenCalled();
    done();
  });

  it('should call handlePageClick if selected page changes', (done) => {
    wrapper.instance().handlePageClick({ selected: 2 });
    expect(handlePageSpy).toHaveBeenCalled();
    done();
  });

  it('should call componentWillRecieveProps', (done) => {
    wrapper
      .instance()
      .componentWillReceiveProps({
        userFavorites: {
          recipes: {
            1: data.fetchRecipesResponse.recipes[0],
            2: data.fetchRecipesResponse.recipes[0]
          }
        }
      });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
    done();
  });

  it('should navigate to previous page if no favorites exist on page',
    (done) => {
      localStorage.setItem('currentPageUserFavorites', 2);
      wrapper
        .instance()
        .componentWillReceiveProps({
          userFavorites: {
            recipes: {}
          }
        });
      expect(localStorage.getItem('currentPageUserFavorites')).toEqual(1);
      done();
    });

  describe('when there are no user favorite recipes to display', () => {
    let { props } = setup(false);
    props = { ...props, userFavorites: {} };
    const noFavoritesWrapper = shallow(<UserFavoriteRecipe {...props} />);

    it('should show a dialog on the user favorite page', (done) => {
      expect(noFavoritesWrapper.find('h5').length).toEqual(1);
      done();
    });
  });

  describe('hasFavorites method should', () => {
    let { props } = setup(false);
    props = { ...props, userFavorites: {} };
    const noFavoritesWrapper = shallow(<UserFavoriteRecipe {...props} />);
    it('return false if there are no favorites to display', (done) => {
      expect(noFavoritesWrapper.instance().hasFavorites()).toBe(false);
      done();
    });

    it('should set page and pageCount to 1 if no favorites are found',
      (done) => {
        expect(noFavoritesWrapper
          .instance()
          .setPagination())
          .toEqual({ page: 1, pageCount: 1 });
        done();
      });

    it('return true if there are favorites to display', (done) => {
      expect(wrapper.instance().hasFavorites()).toBe(true);
      done();
    });
  });
});
