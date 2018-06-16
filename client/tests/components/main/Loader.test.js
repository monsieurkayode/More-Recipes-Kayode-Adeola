/* eslint-disable no-undef */
import React from 'react';

import { Loader } from '../../../src/components/main';

const wrapper = mount(<Loader />);

describe('Loader', () => {
  it('should render correctly',
    (done) => {
      expect(toJson(wrapper)).toMatchSnapshot();
      done();
    });
});
