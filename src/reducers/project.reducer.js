import {
  HTTP_PROJECT_FAILED,
  HTTP_PROJECT_FETCHING,
  HTTP_PROJECT_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false
};

const projectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_PROJECT_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_PROJECT_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_PROJECT_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default projectReducer
