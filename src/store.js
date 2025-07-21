import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from 'redux-thunk'
import logger from 'redux-logger';

import appReducer from "./reducers";

const reducers = combineReducers({
  app: appReducer
});

const middleware = [thunk, logger];  

const enhancers = [applyMiddleware(...middleware)];

const initialState = {};

let composeEnhancers = compose;

if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
}

const store = createStore(reducers, initialState, composeEnhancers(...enhancers));

export default store;
