import {
  HTTP_HERBAL_PAGINATION_FAILED,
  HTTP_HERBAL_PAGINATION_FETCHING,
  HTTP_HERBAL_PAGINATION_SUCCESS,
} from '../constants';

const initialState = {
  result: null,
  pagination: null,
  isFetching: false,
  isError: false,
};

const herbalpaginationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_HERBAL_PAGINATION_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_HERBAL_PAGINATION_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };   
    case HTTP_HERBAL_PAGINATION_SUCCESS:
      return { ...state, result: payload.result, pagination: payload.pagination, isFetching: false, isError: false };
    default:
      return state;
  }
};

export default herbalpaginationReducer
