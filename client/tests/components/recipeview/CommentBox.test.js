/* eslint-disable no-undef */
import React from 'react';

import { CommentBox } from '../../../src/components/recipeview/CommentBox';
import data from '../../__mocks__/mockData';

const renderSpy = jest.spyOn(CommentBox.prototype, 'render');

const setup = () => {
  const props = {
    reset: jest.fn(),
    handleSubmit: jest.fn(),
    currentRecipe: data.fetchRecipesResponse.recipes[0],
    postReview: jest.fn().mockImplementation(() => Promise.resolve())
  };

  const wrapper = shallow(<CommentBox {...props} />);

  return {
    wrapper,
    props
  };
};

const { wrapper, props } = setup();

describe('CommentBox', () => {
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

  it('should have a form with a textarea',
    (done) => {
      const form = wrapper.find('form');
      expect(form.exists()).toBe(true);
      done();
    });

  it('should have a submit button for the form',
    (done) => {
      const submitButton = wrapper.find('button');
      expect(submitButton.exists()).toBe(true);
      done();
    });

  it('should call renderCommentBox',
    (done) => {
      wrapper.instance().renderCommentBox({ input: null });
      done();
    });

  it('should call handleSubmit when the form is submitted',
    (done) => {
      const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
      props.handleSubmit(wrapper.instance().onSubmit());
      expect(handleSubmitSpy).toHaveBeenCalled();
      done();
    });
});
