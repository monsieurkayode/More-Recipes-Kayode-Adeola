/* eslint-disable no-undef */
import React from 'react';

import { NotFoundPage } from '../../../src/components/pages';

const renderSpy = jest.spyOn(NotFoundPage.prototype, 'render');

const setup = () => {
  const props = {
    history: {
      goBack: jest.fn()
    }
  };

  const wrapper = shallow(<NotFoundPage {...props} />);

  return {
    wrapper
  };
};

describe('The NotFoundPage Component', () => {
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

  it('should have a Back to Home link that redirects user to the Homepage',
    (done) => {
      const { wrapper } = setup();
      const backToHomeLink = wrapper.find('.fa-home');
      expect(backToHomeLink.exists()).toBe(true);
      wrapper.find('Link').simulate('click');
      wrapper.find('#back-link').simulate('click');
      done();
    });
});
