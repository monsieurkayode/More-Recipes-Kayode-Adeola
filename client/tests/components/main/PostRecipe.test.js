/* eslint-disable no-undef */
import React from 'react';

import { PostRecipe } from '../../../src/components/main/PostRecipe';
import data from '../../__mocks__/mockData';

const setup = (invalid, isLoading, values) => {
  const props = {
    createPost: jest.fn(),
    handleSubmit: jest.fn(),
    invalid,
    isLoading,
    isFetching: jest.fn(),
    values,
    history: {
      push: jest.fn()
    }
  };

  const wrapper = shallow(<PostRecipe {...props} />);

  return { wrapper, props };
};

const values = data.recipeDetails;

const field = {
  meta: {
    touched: true,
    error: ''
  },
  label: 'Recipe Name',
  input: '',
  type: 'text',
  name: 'recipeName',
  className: '',
  placeholder: 'Enter recipe name'
};

const { wrapper, props } = setup(true, false, values);

describe('PostRecipe', () => {
  it('should render correctly',
    (done) => {
      expect(toJson(wrapper)).toMatchSnapshot();
      done();
    });

  it('should render a form for creating recipes',
    (done) => {
      expect(wrapper.find('form').exists()).toBe(true);
      done();
    });

  it('should have five input fields',
    (done) => {
      expect(wrapper.find('Field').length).toEqual(5);
      done();
    });

  it('should have a post button for submitting',
    (done) => {
      const postButton = wrapper.find('.btn').last();
      expect(postButton.text()).toContain('Post');
      done();
    });

  it('should have a cancel button for cancelling recipe creation',
    (done) => {
      expect(wrapper.find('.btn').first().text()).toContain('Cancel');
      done();
    });

  it('should call handleCategory when category is selected',
    (done) => {
      const handleCategorySpy = jest
        .spyOn(wrapper.instance(), 'handleCategory');

      wrapper.instance().handleCategory({ target: { value: 'specials' } });
      expect(handleCategorySpy).toHaveBeenCalled();
      done();
    });

  it('should call handleSubmit when the form is submitted',
    (done) => {
      const onSubmitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
      props.handleSubmit(wrapper.instance().onSubmit());
      expect(onSubmitSpy).toHaveBeenCalled();
      done();
    });

  it('should call render input fields',
    (done) => {
      wrapper.instance().renderInput(field);
      wrapper.instance().renderTextArea(field);
      wrapper.instance().renderCategory({ value: 'specials' });
      done();
    });
});
