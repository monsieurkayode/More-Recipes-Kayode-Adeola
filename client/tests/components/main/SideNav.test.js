/* eslint-disable no-undef */
import React from 'react';

import { SideNav } from '../../../src/components/main/SideNav';

const setup = () => {
  const props = {
    username: 'username'
  };

  const wrapper = shallow(<SideNav {...props} />);

  return { wrapper };
};

const { wrapper } = setup();

describe('SideNav', () => {
  it('should render correctly',
    (done) => {
      expect(toJson(wrapper)).toMatchSnapshot();
      done();
    });
});
