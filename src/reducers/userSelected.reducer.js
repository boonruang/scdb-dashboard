import {
  HTTP_USER_SELECTED_FAILED,
  HTTP_USER_SELECTED_FETCHING,
  HTTP_USER_SELECTED_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

const userSelectedReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_USER_SELECTED_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_USER_SELECTED_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    case HTTP_USER_SELECTED_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default userSelectedReducer
