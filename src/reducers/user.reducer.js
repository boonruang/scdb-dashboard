import {
  HTTP_USER_FAILED,
  HTTP_USER_FETCHING,
  HTTP_USER_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_USER_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_USER_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_USER_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default userReducer
