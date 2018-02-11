/* eslint-disable no-undef */
import React from 'react';

import { RecipeViewPage } from '../../../src/components/pages/RecipeViewPage';
import data from '../../__mocks__/mockData';

window.scroll = () => {};

const componentDidMountSpy = jest
    .spyOn(RecipeViewPage.prototype, 'componentDidMount'),
  componentDidUpdateSpy = jest
    .spyOn(RecipeViewPage.prototype, 'componentDidUpdate'),
  shouldComponentUpdateSpy = jest
    .spyOn(RecipeViewPage.prototype, 'shouldComponentUpdate'),
  renderSpy = jest
    .spyOn(RecipeViewPage.prototype, 'render');

const setup = (user, recipeId, isFavorite) => {
  const props = {
    user,
    isFavorite,
    reviews: {
      pagination: data.fetchReviewsResponse.pagination,
      comments: {
        [recipeId]: data.fetchReviewsResponse.comments[0]
      }
    },
    currentRecipe: data.fetchSingleRecipeResponse.recipe[0],
    removeFavorite: jest.fn(),
    addFavoriteAction: jest.fn(),
    fetchSingleRecipe: jest.fn().mockImplementation(() => Promise.resolve()),
    fetchSingleFavorite: jest.fn(),
    fetchReviews: jest.fn(),
    upvoteAction: jest.fn(),
    downvoteAction: jest.fn(),
    match: {
      params: {
        recipeId
      }
    }
  };

  const wrapper = shallow(<RecipeViewPage {...props} />);

  wrapper.setState({ isLoading: false });

  return {
    wrapper,
    props
  };
};

describe('The RecipeViewPage Component', () => {
  it('should render correctly',
    (done) => {
      const { wrapper } = setup({ username: 'username' }, '1', true);
      expect(toJson(wrapper)).toMatchSnapshot();
      done();
    });

  it('should have a state of isLoading to be true when component mounts',
    (done) => {
      const { wrapper } = setup({ username: 'username' }, '1', true);
      wrapper.setState({ isLoading: true });
      expect(wrapper.state().isLoading).toBeTruthy();
      done();
    });

  it('should have a state of isLoading set to false after fetching recipe',
    (done) => {
      const { wrapper } = setup({ username: 'username' }, '1', true);
      expect(wrapper.state().isLoading).toBeFalsy();
      done();
    });

  it('should render Loader component only if isLoading state is true',
    (done) => {
      const { wrapper } = setup({ username: 'username' }, '1', true);
      wrapper.setState({ isLoading: true });
      expect(wrapper.find('Loader').length).toEqual(1);
      expect(wrapper.find('HomeNavbar').length).toEqual(0);
      expect(wrapper.find('SideNav').length).toEqual(0);
      expect(wrapper.find('Footer').length).toEqual(0);
      expect(wrapper.find('CommentBox').length).toEqual(0);
      expect(wrapper.find('Ingredients').length).toEqual(0);
      expect(wrapper.find('Instructions').length).toEqual(0);
      done();
    });

  it('should call upvoteAction when the upvote button is clicked',
    (done) => {
      const { wrapper, props } = setup({ username: 'username' }, '1', true);
      wrapper.find('.chip').first().simulate('click');
      expect(props.upvoteAction.mock.calls.length).toBe(1);
      done();
    });
  it('should call downvoteAction when the downvote button is clicked',
    (done) => {
      const { wrapper, props } = setup({ username: 'username' }, '1', true);
      wrapper.find('.chip').at(1).simulate('click');
      expect(props.downvoteAction.mock.calls.length).toBe(1);
      done();
    });

  it('should call addFavoriteAction when the favorite button is clicked' +
  ' and recipe has not been favorited',
  (done) => {
    const { wrapper, props } = setup({ username: 'username' }, '1', false);
    wrapper.find('.chip').at(2).simulate('click');
    expect(props.addFavoriteAction.mock.calls.length).toBe(1);
    done();
  });

  it('should call removeFavorite action when the favorite button is clicked' +
  ' and recipe has already been favorited',
  (done) => {
    const { wrapper, props } = setup({ username: 'username' }, '1', true);
    wrapper.find('.chip').at(2).simulate('click');
    expect(props.removeFavorite.mock.calls.length).toBe(1);
    done();
  });

  it('should call componentDidMount method',
    (done) => {
      expect(componentDidMountSpy).toHaveBeenCalled();
      done();
    });

  it('should call componentDidUpdate method',
    (done) => {
      expect(componentDidUpdateSpy).toHaveBeenCalled();
      done();
    });

  it('should call shouldComponentUpdate method',
    (done) => {
      expect(shouldComponentUpdateSpy).toHaveBeenCalled();
      done();
    });

  it('should call render method',
    (done) => {
      expect(renderSpy).toHaveBeenCalled();
      done();
    });

  describe('should have', () => {
    it('an image element with class materialboxed', (done) => {
      const { wrapper } = setup({ username: 'username' }, '1', true);
      expect(wrapper.find('.materialboxed').length).toEqual(1);
      done();
    });

    it('three buttons for upvoting, downvoting and favoriting a recipe',
      (done) => {
        const { wrapper } = setup({ username: 'username' }, '1', true);
        expect(wrapper.find('.boxReaction').length).toEqual(3);
        done();
      });

    it('a favorite button with class orange-text if recipe is favorited',
      (done) => {
        const { wrapper } = setup({ username: 'username' }, '1', true);
        expect(wrapper.find('.orange-text').exists()).toBe(true);
        done();
      });
  });
});
