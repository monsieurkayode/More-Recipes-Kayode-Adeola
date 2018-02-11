/* eslint-disable no-undef */
import React from 'react';

import { UserProfile } from '../../../src/components/dashboard';

const setup = () => {
  const props = {
    user: {
      username: 'username'
    },
    selected: 'profile'
  };

  const wrapper = shallow(<UserProfile {...props} />);

  return {
    wrapper
  };
};

const { wrapper } = setup();

describe('UserProfile', () => {
  it('should render correctly',
    (done) => {
      expect(toJson(wrapper)).toMatchSnapshot();
      done();
    });
});
