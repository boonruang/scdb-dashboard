import {
  HTTP_DASHBOARD5_FAILED,
  HTTP_DASHBOARD5_FETCHING,
  HTTP_DASHBOARD5_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

const dashboard5Reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_DASHBOARD5_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_DASHBOARD5_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_DASHBOARD5_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default dashboard5Reducer
