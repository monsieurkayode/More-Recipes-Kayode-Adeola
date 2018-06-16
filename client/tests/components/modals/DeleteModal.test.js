/* eslint-disable no-undef */
import React from 'react';

import DeleteModal from '../../../src/components/modals';

const setup = (selected, dialog) => {
  const handleAction = jest.fn();
  const props = {
    id: 1,
    handleAction,
    selected,
    dialog
  };
  const wrapper = mount(<DeleteModal {...props} />);
  return {
    wrapper,
    props
  };
};

describe('The DeleteModal Component', () => {
  it('should render correctly', (done) => {
    const { wrapper } = setup('recipes', 'Delete recipe');
    expect(toJson(wrapper)).toMatchSnapshot();
    done();
  });

  it('should show Delete text on button if deleting a recipe', (done) => {
    const { wrapper } = setup('recipes', 'Delete recipe');
    expect(wrapper.find('button').last().text()).toContain('Delete');
    done();
  });

  it('should show Remove text on button if removing a favorite', (done) => {
    const { wrapper } = setup('favorites', 'Remove from favorite');
    expect(wrapper.find('button').last().text()).toContain('Remove');
    done();
  });

  it('should call handleAction once when action button is clicked', (done) => {
    const { wrapper, props } = setup('favorites', 'Remove from favorite');
    wrapper.find('button').last().simulate('click');
    expect(props.handleAction.mock.calls.length).toBe(1);
    done();
  });
});
