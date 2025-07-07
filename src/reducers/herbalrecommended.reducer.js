import {
  HTTP_HERBAL_RECOMMENDED_SUCCESS,
  HTTP_HERBAL_RECOMMENDED_FAILED,
  HTTP_HERBAL_RECOMMENDED_FETCHING,  
} from '../constants';

const initialState = {
  isRecommendedFetching: false,
  isRecommendedError: false,
  recommendedResult: null,    
};

const herbalrecommendedReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_HERBAL_RECOMMENDED_SUCCESS:
      return { ...state, recommendedResult: payload.result, isRecommendedError: false, isRecommendedFetching : false };            
    case HTTP_HERBAL_RECOMMENDED_FAILED:
      return { ...state, recommendedResult: null, isRecommendedError: true, isRecommendedFetching : false };            
    case HTTP_HERBAL_RECOMMENDED_FETCHING:
      return { ...state, recommendedResult: null, isRecommendedError: false , isRecommendedFetching : true };                 
    default:
      return state;
  }
};

export default herbalrecommendedReducer
