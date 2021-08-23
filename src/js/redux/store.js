import { createStore, compose } from 'redux';
import rootReducer from './combiner';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(rootReducer, composeEnhancers());
