import {
  HTTP_STANDARDTYPE_FAILED,
  HTTP_STANDARDTYPE_FETCHING,
  HTTP_STANDARDTYPE_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

const standardtypeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_STANDARDTYPE_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_STANDARDTYPE_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_STANDARDTYPE_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };     
    default:
      return state;
  }
};

export default standardtypeReducer
