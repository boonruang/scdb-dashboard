import {
  HTTP_MARKETPLACE_FAILED,
  HTTP_MARKETPLACE_FETCHING,
  HTTP_MARKETPLACE_SUCCESS
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false
};

const marketplaceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_MARKETPLACE_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_MARKETPLACE_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_MARKETPLACE_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default marketplaceReducer
