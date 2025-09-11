import {
  HTTP_DEPARTMENT_FAILED,
  HTTP_DEPARTMENT_FETCHING,
  HTTP_DEPARTMENT_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false
};

const departmentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_DEPARTMENT_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_DEPARTMENT_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_DEPARTMENT_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default departmentReducer
