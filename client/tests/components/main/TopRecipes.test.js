/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { TopRecipes } from '../../../src/components/main';
import data from '../../__mocks__/mockData';


const setup = () => {
  const store = mockStore({
    topRecipes: [data.recipeDetails]
  });
  const props = {
    topRecipes: store.getState().topRecipes
  };
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <TopRecipes {...props} />
      </BrowserRouter>
    </Provider>
  );
  return {
    wrapper,
    props
  };
};

describe('The TopRecipes Component', () => {
  it('should render correctly', (done) => {
    const { wrapper } = setup('username');
    expect(toJson(wrapper)).toMatchSnapshot();
    done();
  });
});
