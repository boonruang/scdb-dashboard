import {
  HTTP_HERBAL_PRICEYEAR_SUCCESS,
  HTTP_HERBAL_PRICEYEAR_FAILED,
  HTTP_HERBAL_PRICEYEAR_FETCHING,  
} from '../constants';

const initialState = {
  isFetching: false,
  isError: false,
  result: null,    
};

const herbalpriceyearReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_HERBAL_PRICEYEAR_SUCCESS:
      return { ...state, result: payload.result, isError: false, isFetching : false };            
    case HTTP_HERBAL_PRICEYEAR_FAILED:
      return { ...state, result: null, isError: true, isFetching : false };            
    case HTTP_HERBAL_PRICEYEAR_FETCHING:
      return { ...state, result: null, isError: false , isFetching : true };                 
    default:
      return state;
  }
};

export default herbalpriceyearReducer
