/* eslint-disable no-undef */
import React from 'react';

import { TextField } from '../../../src/components/main';

const props = {
  field: <div />,
  value: '',
  onChange: jest.fn()
};

const wrapper = mount(<TextField {...props} />);

describe('TextField', () => {
  it('should render correctly',
    (done) => {
      expect(toJson(wrapper)).toMatchSnapshot();
      done();
    });
});
