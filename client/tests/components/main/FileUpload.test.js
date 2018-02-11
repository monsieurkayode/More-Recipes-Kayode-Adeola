/* eslint-disable no-undef */
import React from 'react';

import FileUpload from '../../../src/components/main/FileUpload';

const setup = () => {
  const props = {
    input: {
      onChange: jest.fn(),
      onBlur: jest.fn(),
      value: null,
      meta: null
    }
  };

  const wrapper = shallow(<FileUpload {...props} />);

  return { wrapper };
};

const { wrapper } = setup();

describe('FileUpload', () => {
  it('should render correctly',
    (done) => {
      expect(toJson(wrapper)).toMatchSnapshot();
      done();
    });
});
