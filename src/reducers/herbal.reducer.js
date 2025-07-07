import {
  HTTP_HERBAL_FAILED,
  HTTP_HERBAL_FETCHING,
  HTTP_HERBAL_SUCCESS,
  HERBAL_SEARCH_FETCHING,
  HERBAL_SEARCH_SUCCESS,
  HERBAL_SEARCH_FAILED,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
  isSearchFetching: false,
};

const herbalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_HERBAL_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_HERBAL_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_HERBAL_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };   
    case HERBAL_SEARCH_FETCHING:
      return { ...state, result: null, isSearchFetching: true };
    case HERBAL_SEARCH_SUCCESS:
      return { ...state, herbalSearchList: payload.result, result: null,  isSearchFetching: false };
    case HERBAL_SEARCH_FAILED:
      return { ...state, result: null, herbalSearchList: null,  isSearchFetching: false, isError: true };      
    default:
      return state;
  }
};

export default herbalReducer
