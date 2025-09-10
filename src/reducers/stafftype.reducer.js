import {
  HTTP_STAFFTYPE_FAILED,
  HTTP_STAFFTYPE_FETCHING,
  HTTP_STAFFTYPE_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false
};

const stafftypeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_STAFFTYPE_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_STAFFTYPE_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_STAFFTYPE_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default stafftypeReducer
