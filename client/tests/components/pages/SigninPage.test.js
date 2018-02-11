/* eslint-disable no-undef */
import React from 'react';

import { SigninPage } from '../../../src/components/pages';

const renderSpy = jest.spyOn(SigninPage.prototype, 'render');

const setup = () => {
  const props = {
    history: {}
  };

  const wrapper = shallow(<SigninPage {...props} />);

  return {
    wrapper
  };
};

describe('The SigninPage Component', () => {
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
