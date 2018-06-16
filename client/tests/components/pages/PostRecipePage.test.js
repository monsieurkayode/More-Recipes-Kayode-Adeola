/* eslint-disable no-undef */
import React from 'react';

import { PostRecipePage } from '../../../src/components/pages';

const renderSpy = jest.spyOn(PostRecipePage.prototype, 'render');

const setup = () => {
  const props = {
    history: {}
  };

  const wrapper = shallow(<PostRecipePage {...props} />);

  return {
    wrapper
  };
};

describe('The PostRecipePage Component', () => {
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
