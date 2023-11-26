import { rootReducer } from '../reducers/rootReducer.js';

import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
//import thunk from 'redux-thunk';




export const store = createStore(rootReducer);