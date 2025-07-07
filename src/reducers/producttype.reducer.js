import {
  HTTP_PRODUCTTYPE_FAILED,
  HTTP_PRODUCTTYPE_FETCHING,
  HTTP_PRODUCTTYPE_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

const producttypeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_PRODUCTTYPE_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_PRODUCTTYPE_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_PRODUCTTYPE_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };     
    default:
      return state;
  }
};

export default producttypeReducer
