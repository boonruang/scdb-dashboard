import {
  HTTP_PHILOSOPHER_FAILED,
  HTTP_PHILOSOPHER_FETCHING,
  HTTP_PHILOSOPHER_SUCCESS,
  HTTP_PHILOSOPHER_SELECTED_SUCCESS,
  HTTP_PHILOSOPHER_SELECTED_FAILED,
  HTTP_PHILOSOPHER_SELECTED_FETCHING,
} from '../constants';

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
  isSelectedFetching: false,
  isSelectedError: false,
  selectedResult: null,
};

const philosopherReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_PHILOSOPHER_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_PHILOSOPHER_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false };
    case HTTP_PHILOSOPHER_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case HTTP_PHILOSOPHER_SELECTED_SUCCESS:
      return { ...state, selectedResult: payload.result, isSelectedError: false, isSelectedFetching : false };            
    case HTTP_PHILOSOPHER_SELECTED_FAILED:
      return { ...state, selectedResult: null, isSelectedError: true, isSelectedFetching : false };            
    case HTTP_PHILOSOPHER_SELECTED_FETCHING:
      return { ...state, selectedResult: null, isSelectedError: false , isSelectedFetching : true };         
    default:
      return state;
  }
};

export default philosopherReducer
