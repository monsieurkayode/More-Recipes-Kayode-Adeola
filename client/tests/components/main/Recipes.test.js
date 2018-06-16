/* eslint-disable no-undef */
import React from 'react';

import { Recipes } from '../../../src/components/main/Recipes';
import data from '../../__mocks__/mockData';

const setup = (isLoading) => {
  const props = {
    recipes: {
      1: data.fetchRecipesResponse.recipes[0]
    },
    pagination: data.fetchRecipesResponse.pagination,
    isLoading,
    upvoteAction: jest.fn(),
    downvoteAction: jest.fn(),
    fetchRecipesAction: jest.fn().mockImplementation(() => Promise.resolve())
  };

  localStorage.setItem('currentPage', 1);

  const wrapper = shallow(<Recipes {...props} />);

  return {
    wrapper,
    props
  };
};

const { wrapper } = setup(false);

describe('UserRecipe', () => {
  it('should render correctly',
    (done) => {
      expect(toJson(wrapper)).toMatchSnapshot();
      done();
    });

  it('should have a pagination component for page navigation', (done) => {
    expect(wrapper.find('.pagination-container').exists()).toBe(true);
    done();
  });

  it('should call handlePageClick if selected page changes', (done) => {
    const handlePageSpy = jest.spyOn(wrapper.instance(), 'handlePageClick');
    wrapper.instance().handlePageClick({ selected: 2 });
    expect(handlePageSpy).toHaveBeenCalledWith({ selected: 2 });
    done();
  });

  describe('hasRecipes method should', () => {
    let { props } = setup(false);
    props = { ...props, recipes: {} };
    const noRecipesWrapper = shallow(<Recipes {...props} />);
    it('return false if there are no recipes to display', (done) => {
      expect(noRecipesWrapper.instance().hasRecipes()).toBe(false);
      done();
    });

    it('return true if there are recipes to display', (done) => {
      expect(wrapper.instance().hasRecipes()).toBe(true);
      done();
    });
  });
});
