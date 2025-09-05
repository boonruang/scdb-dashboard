import {
  HTTP_DOCUMENT_FAILED,
  HTTP_DOCUMENT_FETCHING,
  HTTP_DOCUMENT_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false
};

const documentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_DOCUMENT_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_DOCUMENT_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_DOCUMENT_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default documentReducer
