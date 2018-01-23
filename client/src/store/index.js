import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import reducers from '../reducers';

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers, composeEnhancers);

export default store;
