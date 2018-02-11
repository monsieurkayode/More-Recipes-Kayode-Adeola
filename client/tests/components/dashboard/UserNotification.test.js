/* eslint-disable no-undef */
import React from 'react';

import { UserNotification } from '../../../src/components/dashboard';


const setup = () => {
  const wrapper = mount(<UserNotification />);
  return {
    wrapper
  };
};

describe('The UserNotification Component', () => {
  it('should render correctly', (done) => {
    const { wrapper } = setup();
    expect(toJson(wrapper)).toMatchSnapshot();
    done();
  });
});
