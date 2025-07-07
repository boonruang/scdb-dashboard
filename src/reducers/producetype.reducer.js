import {
  HTTP_PRODUCETYPE_FAILED,
  HTTP_PRODUCETYPE_FETCHING,
  HTTP_PRODUCETYPE_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

const producetypeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_PRODUCETYPE_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_PRODUCETYPE_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_PRODUCETYPE_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };     
    default:
      return state;
  }
};

export default producetypeReducer
