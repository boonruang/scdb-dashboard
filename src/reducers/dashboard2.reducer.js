import {
  HTTP_DASHBOARD2_FAILED,
  HTTP_DASHBOARD2_FETCHING,
  HTTP_DASHBOARD2_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

const dashboard2Reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_DASHBOARD2_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_DASHBOARD2_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_DASHBOARD2_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default dashboard2Reducer
