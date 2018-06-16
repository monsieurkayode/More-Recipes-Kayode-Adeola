/* eslint-disable no-undef */
import React from 'react';

import { SignupPage } from '../../../src/components/pages';

const renderSpy = jest.spyOn(SignupPage.prototype, 'render');

const setup = () => {
  const props = {
    history: {}
  };

  const wrapper = shallow(<SignupPage {...props} />);

  return {
    wrapper
  };
};

describe('The SignupPage Component', () => {
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
