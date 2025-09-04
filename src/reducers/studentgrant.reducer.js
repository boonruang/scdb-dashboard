import {
  HTTP_STUDENTGRANT_FAILED,
  HTTP_STUDENTGRANT_FETCHING,
  HTTP_STUDENTGRANT_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false
};

const studentgrantReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_STUDENTGRANT_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_STUDENTGRANT_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_STUDENTGRANT_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default studentgrantReducer
