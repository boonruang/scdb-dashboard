import {
  HTTP_STAFFUPLOADFILE_FAILED,
  HTTP_STAFFUPLOADFILE_FETCHING,
  HTTP_STAFFUPLOADFILE_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

const staffuploadfileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_STAFFUPLOADFILE_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_STAFFUPLOADFILE_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_STAFFUPLOADFILE_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    default:
      return state;
  }
};

export default staffuploadfileReducer
