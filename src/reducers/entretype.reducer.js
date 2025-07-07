import {
  HTTP_ENTRETYPE_FAILED,
  HTTP_ENTRETYPE_FETCHING,
  HTTP_ENTRETYPE_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

const entretypeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_ENTRETYPE_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_ENTRETYPE_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_ENTRETYPE_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default entretypeReducer
