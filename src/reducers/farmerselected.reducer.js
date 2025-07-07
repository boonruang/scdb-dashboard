import {
  HTTP_FARMER_SELECTED_SUCCESS,
  HTTP_FARMER_SELECTED_FAILED,
  HTTP_FARMER_SELECTED_FETCHING,
} from '../constants';

const initialState = {
  isSelectedFetching: false,
  isSelectedError: false,
  selectedResult: null,
};

const farmerselectedReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_FARMER_SELECTED_SUCCESS:
      return { ...state, selectedResult: payload.result, isSelectedError: false, isSelectedFetching : false };            
    case HTTP_FARMER_SELECTED_FAILED:
      return { ...state, selectedResult: null, isSelectedError: true, isSelectedFetching : false };            
    case HTTP_FARMER_SELECTED_FETCHING:
      return { ...state, selectedResult: null, isSelectedError: false , isSelectedFetching : true };         
    default:
      return state;
  }
};

export default farmerselectedReducer
