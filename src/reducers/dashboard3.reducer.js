import {
  HTTP_DASHBOARD3_FAILED,
  HTTP_DASHBOARD3_FETCHING,
  HTTP_DASHBOARD3_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

const dashboard3Reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_DASHBOARD3_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_DASHBOARD3_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_DASHBOARD3_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default dashboard3Reducer
