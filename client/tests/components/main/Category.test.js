/* eslint-disable no-undef */
import React from 'react';

import { Category } from '../../../src/components/main/Category';

const setup = () => {
  const props = {
    searchPost: jest.fn()
  };

  const wrapper = shallow(<Category {...props} />);

  return { wrapper };
};

const event = { target: { name: 'searchTerm', value: 'rec' } };
const { wrapper } = setup();

describe('Category', () => {
  it('should render correctly',
    (done) => {
      expect(toJson(wrapper)).toMatchSnapshot();
      done();
    });

  it('should have a form for searching recipes',
    (done) => {
      expect(wrapper.find('form').exists()).toBe(true);
      done();
    });

  it('should have a select dropdown for setting search criteria',
    (done) => {
      expect(wrapper.find('select').exists()).toBe(true);
      done();
    });

  it('should call handleChange form input changes',
    (done) => {
      const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange');
      wrapper.instance().handleChange(event);
      expect(wrapper.state().searchTerm).toBe('rec');
      expect(handleChangeSpy).toHaveBeenCalledWith(event);
      done();
    });

  it('should call handleSearchType on selecting search criteria',
    (done) => {
      const handleSearchTypeSpy = jest
        .spyOn(wrapper.instance(), 'handleSearchType');
      wrapper.instance().handleSearchType({ target: { value: 'name' } });
      expect(wrapper.state().searchType).toBe('name');
      expect(handleSearchTypeSpy).toHaveBeenCalled();
      done();
    });

  it('should call handleSearch when search keyword character length is up to 3',
    (done) => {
      const handleSearchSpy = jest.spyOn(wrapper.instance(), 'handleSearch');
      wrapper.instance().handleChange(event);
      wrapper.instance().handleSearchType({ target: { value: 'name' } });
      wrapper.instance().handleSearch();
      expect(handleSearchSpy).toHaveBeenCalled();
      done();
    });
});
