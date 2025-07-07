import {
  HTTP_HERBAL_PRICE_SUCCESS,
  HTTP_HERBAL_PRICE_FAILED,
  HTTP_HERBAL_PRICE_FETCHING,  
} from '../constants';

const initialState = {
  isFetching: false,
  isError: false,
  result: null,    
};

const herbalpriceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_HERBAL_PRICE_SUCCESS:
      return { ...state, result: payload.result, isError: false, isFetching : false };            
    case HTTP_HERBAL_PRICE_FAILED:
      return { ...state, result: null, isError: true, isFetching : false };            
    case HTTP_HERBAL_PRICE_FETCHING:
      return { ...state, result: null, isError: false , isFetching : true };                 
    default:
      return state;
  }
};

export default herbalpriceReducer
