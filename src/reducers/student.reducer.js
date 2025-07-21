import {
  HTTP_STUDENT_FAILED,
  HTTP_STUDENT_FETCHING,
  HTTP_STUDENT_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false
};

const studentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_STUDENT_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_STUDENT_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_STUDENT_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default studentReducer
