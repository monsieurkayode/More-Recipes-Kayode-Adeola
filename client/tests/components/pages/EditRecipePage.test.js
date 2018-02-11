/* eslint-disable no-undef */
import React from 'react';

import { EditRecipePage } from '../../../src/components/pages';

const renderSpy = jest.spyOn(EditRecipePage.prototype, 'render');

const setup = () => {
  const props = {
    history: {
      push: jest.fn()
    },
    match: {}
  };

  const wrapper = shallow(<EditRecipePage {...props} />);

  return {
    wrapper
  };
};

describe('The EditRecipePage Component', () => {
  it('should render correctly',
    (done) => {
      const { wrapper } = setup();
      expect(toJson(wrapper)).toMatchSnapshot();
      done();
    });

  it('should call render method',
    (done) => {
      expect(renderSpy).toHaveBeenCalled();
      done();
    });
});
