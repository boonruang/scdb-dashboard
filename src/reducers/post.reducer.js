import {
  HTTP_POST_FAILED,
  HTTP_POST_FETCHING,
  HTTP_POST_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false
};

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_POST_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_POST_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_POST_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default postReducer
