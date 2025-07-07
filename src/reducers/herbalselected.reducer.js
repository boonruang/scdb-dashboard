import {
  HTTP_HERBAL_SELECTED_SUCCESS,
  HTTP_HERBAL_SELECTED_FAILED,
  HTTP_HERBAL_SELECTED_FETCHING,
  SET_PLANTING_SELECTION,
  SET_AMPHOE_SELECTION,  
  SET_SOIL_FIELD_SELECTION,
} from '../constants';

const initialState = {
  isSelectedFetching: false,
  isSelectedError: false,
  selectedResult: null,
  plantingSelected: 'soil',  
  amphoeSelected: '01',  
  soilFieldSelected: 'fertility',
};

const herbalselectedReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_HERBAL_SELECTED_SUCCESS:
      return { ...state, selectedResult: payload.result, isSelectedError: false, isSelectedFetching : false };            
    case HTTP_HERBAL_SELECTED_FAILED:
      return { ...state, selectedResult: null, isSelectedError: true, isSelectedFetching : false };            
    case HTTP_HERBAL_SELECTED_FETCHING:
      return { ...state, selectedResult: null, isSelectedError: false , isSelectedFetching : true };
    case SET_PLANTING_SELECTION:
      return { ...state, plantingSelected: payload }              
    case SET_AMPHOE_SELECTION:
      return { ...state, amphoeSelected: payload }              
    case  SET_SOIL_FIELD_SELECTION:
      return { ...state, soilFieldSelected: payload }   
    default:
      return state;
  }
};

export default herbalselectedReducer
