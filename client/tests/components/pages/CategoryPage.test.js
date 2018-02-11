/* eslint-disable no-undef */
import React from 'react';

import { CategoryPage } from '../../../src/components/pages/CategoryPage';
import data from '../../__mocks__/mockData';

const renderSpy = jest.spyOn(CategoryPage.prototype, 'render');
const toggleSmileySpy = jest.spyOn(CategoryPage.prototype, 'toggleSmiley');
const setPaginationSpy = jest.spyOn(CategoryPage.prototype, 'setPagination');
const handlePageSpy = jest.spyOn(CategoryPage.prototype, 'handlePageClick');

const setup = () => {
  const props = {
    recipes: {
      recipes: {
        1: data.fetchRecipesResponse.recipes[0]
      },
      pagination: data.fetchRecipesResponse.pagination,
    },
    match: {
      params: {
        categoryName: 'specials'
      }
    },
    fetchRecipesByCategory: jest.fn()
      .mockImplementation(() => Promise.resolve()),

    upvoteAction: jest.fn(),
    downvoteAction: jest.fn()
  };

  localStorage.setItem('currentCategoryPage', 1);

  const wrapper = shallow(<CategoryPage {...props} />);

  return {
    wrapper,
    props
  };
};

const { wrapper } = setup();

describe('CategoryPage', () => {
  beforeAll(() => {
    wrapper.setState({
      firstLoad: true,
      isLoading: true,
      limit: 1,
      changeSmiley: false,
    });
  });

  afterEach(() => {
    wrapper.setState({
      firstLoad: false,
      isLoading: false,
    });
  });

  it('should render Loader component only when network request is pending',
    (done) => {
      expect(wrapper.find('Loader').length).toBe(1);
      done();
    });

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

  it('should set the class of a category link to active onClick', (done) => {
    wrapper.find('.collapsible-header').first().simulate('click');
    expect(wrapper.find('.active').length).toEqual(1);
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

  describe('when no recipe belonging to a category is found', () => {
    let { props } = setup();
    props = { ...props, recipes: { ...props.recipes, recipes: {} } };
    const noRecipesWrapper = shallow(<CategoryPage {...props} />);
    noRecipesWrapper.setState({ firstLoad: false, isLoading: false });

    it('should display a sad smiley image', (done) => {
      expect(noRecipesWrapper.find('#smiley').length).toEqual(1);
      done();
    });

    it('should display message with link for adding recipes', (done) => {
      expect(noRecipesWrapper.find('h6').exists()).toBe(true);
      done();
    });

    it('onMouseEnter or onMouseLeave add, should call toggleSmiley', (done) => {
      noRecipesWrapper.find('Link').last().simulate('mouseEnter');
      noRecipesWrapper.find('Link').last().simulate('mouseLeave');
      expect(toggleSmileySpy).toHaveBeenCalled();
      done();
    });
  });

  describe('hasRecipes method should', () => {
    let { props } = setup();
    props = { ...props, recipes: {} };
    const noRecipesWrapper = shallow(<CategoryPage {...props} />);
    noRecipesWrapper.setState({ firstLoad: false, isLoading: true });
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
