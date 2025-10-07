import {
  HTTP_DASHBOARD4_FAILED,
  HTTP_DASHBOARD4_FETCHING,
  HTTP_DASHBOARD4_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

const dashboard4Reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_DASHBOARD4_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_DASHBOARD4_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_DASHBOARD4_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default dashboard4Reducer
