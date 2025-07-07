import {
  HTTP_DASHBOARD_FAILED,
  HTTP_DASHBOARD_FETCHING,
  HTTP_DASHBOARD_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

const dashboardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_DASHBOARD_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_DASHBOARD_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_DASHBOARD_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default dashboardReducer
