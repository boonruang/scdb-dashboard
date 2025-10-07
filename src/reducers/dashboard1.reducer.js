import {
  HTTP_DASHBOARD1_FAILED,
  HTTP_DASHBOARD1_FETCHING,
  HTTP_DASHBOARD1_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

const dashboard1Reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_DASHBOARD1_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_DASHBOARD1_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_DASHBOARD1_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default dashboard1Reducer
