import {
  HTTP_ROLE_FAILED,
  HTTP_ROLE_FETCHING,
  HTTP_ROLE_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

const roleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_ROLE_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_ROLE_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_ROLE_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default roleReducer
