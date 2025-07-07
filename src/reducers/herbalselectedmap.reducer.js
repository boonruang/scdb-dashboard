import {
  HTTP_HERBAL_SELECTED_MAP_SUCCESS,
  HTTP_HERBAL_SELECTED_MAP_FAILED,
  HTTP_HERBAL_SELECTED_MAP_FETCHING,
} from '../constants';

const initialState = {
  isSelectedFetching: false,
  isSelectedError: false,
  selectedResult: null,
};

const herbalselectedmapReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_HERBAL_SELECTED_MAP_SUCCESS:
      return { ...state, selectedResult: payload.result, isSelectedError: false, isSelectedFetching : false };            
    case HTTP_HERBAL_SELECTED_MAP_FAILED:
      return { ...state, selectedResult: null, isSelectedError: true, isSelectedFetching : false };            
    case HTTP_HERBAL_SELECTED_MAP_FETCHING:
      return { ...state, selectedResult: null, isSelectedError: false , isSelectedFetching : true };
    default:
      return state;
  }
};

export default herbalselectedmapReducer
