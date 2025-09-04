import {
  HTTP_LEAVERECORD_FAILED,
  HTTP_LEAVERECORD_FETCHING,
  HTTP_LEAVERECORD_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false
};

const leaverecordReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_LEAVERECORD_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_LEAVERECORD_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_LEAVERECORD_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default leaverecordReducer
