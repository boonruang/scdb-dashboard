import {
  HTTP_MANUFACTURER_MAP_FETCHING,
  HTTP_MANUFACTURER_MAP_SUCCESS,
  HTTP_MANUFACTURER_MAP_FAILED,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

const manufacturermapReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_MANUFACTURER_MAP_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_MANUFACTURER_MAP_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_MANUFACTURER_MAP_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default manufacturermapReducer