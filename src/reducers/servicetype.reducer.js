import {
  HTTP_SERVICETYPE_FAILED,
  HTTP_SERVICETYPE_FETCHING,
  HTTP_SERVICETYPE_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

const servicetypeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_SERVICETYPE_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_SERVICETYPE_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_SERVICETYPE_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default servicetypeReducer
