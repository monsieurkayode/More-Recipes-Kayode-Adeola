import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import reducers from '../reducers';

let composeEnhancers = [];
const env = process.env.NODE_ENV || 'development';

if (env !== 'production') {
  /* eslint-disable */
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
}

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers, composeEnhancers);

export default store;
