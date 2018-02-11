/* eslint-disable no-undef */
import React from 'react';

import { UserRecipe } from '../../../src/components/dashboard';
import data from '../../__mocks__/mockData';

const renderSpy = jest.spyOn(UserRecipe.prototype, 'render');
const componentWillReceivePropsSpy = jest
  .spyOn(UserRecipe.prototype, 'componentWillReceiveProps');
const setPaginationSpy = jest.spyOn(UserRecipe.prototype, 'setPagination');
const handlePageSpy = jest.spyOn(UserRecipe.prototype, 'handlePageClick');

const setup = (isLoadingRecipes) => {
  const props = {
    userRecipes: {
      recipes: {
        1: data.fetchRecipesResponse.recipes[0]
      },
      pagination: data.fetchRecipesResponse.pagination,
    },
    isFetching: jest.fn(),
    selected: 'recipes',
    selectRecipe: jest.fn(),
    isLoadingRecipes,
    fetchUserRecipes: jest.fn()
  };

  localStorage.setItem('currentPageUserRecipes', 1);

  const wrapper = shallow(<UserRecipe {...props} />);

  return {
    wrapper,
    props
  };
};

const { wrapper } = setup(false);

describe('UserRecipe', () => {
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
        userRecipes: {
          recipes: {
            1: data.fetchRecipesResponse.recipes[0],
            2: data.fetchRecipesResponse.recipes[0]
          }
        }
      });
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
    done();
  });

  it('should navigate to previous page if no content exist on page',
    (done) => {
      localStorage.setItem('currentPageUserRecipes', 2);
      wrapper
        .instance()
        .componentWillReceiveProps({
          userRecipes: {
            recipes: {}
          }
        });
      expect(localStorage.getItem('currentPageUserRecipes')).toEqual(1);
      done();
    });

  describe('when there are no user recipes to display', () => {
    let { props } = setup(false);
    props = { ...props, userRecipes: {} };
    const noRecipesWrapper = shallow(<UserRecipe {...props} />);

    it('should show a dialog on the user recipe page', (done) => {
      expect(noRecipesWrapper.find('h5').length).toEqual(1);
      done();
    });
  });

  describe('hasRecipes method should', () => {
    let { props } = setup(false);
    props = { ...props, userRecipes: {} };
    const noRecipesWrapper = shallow(<UserRecipe {...props} />);
    it('return false if there are no recipes to display', (done) => {
      expect(noRecipesWrapper.instance().hasRecipes()).toBe(false);
      done();
    });

    it('should set page and pageCount to 1 if no recipes are found',
      (done) => {
        expect(noRecipesWrapper
          .instance()
          .setPagination())
          .toEqual({ page: 1, pageCount: 1 });
        done();
      });

    it('return true if there are recipes to display', (done) => {
      expect(wrapper.instance().hasRecipes()).toBe(true);
      done();
    });
  });
});
