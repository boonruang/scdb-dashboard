import {
  HTTP_OWNERTYPE_FAILED,
  HTTP_OWNERTYPE_FETCHING,
  HTTP_OWNERTYPE_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

const ownertypeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_OWNERTYPE_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_OWNERTYPE_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_OWNERTYPE_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default ownertypeReducer
