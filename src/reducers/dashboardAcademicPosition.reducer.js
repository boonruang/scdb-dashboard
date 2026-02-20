import {
  HTTP_DASHBOARD6_FAILED,
  HTTP_DASHBOARD6_FETCHING,
  HTTP_DASHBOARD6_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

const dashboardAcademicPositionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_DASHBOARD6_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_DASHBOARD6_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    case HTTP_DASHBOARD6_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default dashboardAcademicPositionReducer;
