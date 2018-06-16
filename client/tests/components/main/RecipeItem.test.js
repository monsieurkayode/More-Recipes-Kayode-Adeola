/* eslint-disable no-undef */
import React from 'react';

import { RecipeItem } from '../../../src/components/main';
import data from '../../__mocks__/mockData';

const setup = () => {
  const props = {
    grid: 'm4',
    recipe: data.fetchRecipesResponse.recipes[0],
    upvote: jest.fn(),
    downvote: jest.fn(),
  };

  const wrapper = shallow(<RecipeItem {...props} />);

  return {
    wrapper,
    props
  };
};

const { wrapper, props } = setup();

describe('RecipeItem', () => {
  it('should render correctly',
    (done) => {
      expect(toJson(wrapper)).toMatchSnapshot();
      done();
    });

  it('should display the recipe view counts', (done) => {
    expect(wrapper.find('.card-title').first().text()).toEqual('0 Views');
    done();
  });

  it('should show the recipe name', (done) => {
    expect(wrapper.find('.card-title').last().text()).toEqual('Chicken Soup');
    done();
  });

  describe('onClick', () => {
    it('of the upvote button should upvote the recipe', (done) => {
      const upVoteButton = wrapper.find('.like');
      upVoteButton.simulate('click');
      expect(props.upvote.mock.calls.length).toEqual(1);
      done();
    });

    it('of the downvote button should downvote the recipe', (done) => {
      const downVoteButton = wrapper.find('.unlike');
      downVoteButton.simulate('click');
      expect(props.downvote.mock.calls.length).toEqual(1);
      done();
    });
  });
});
