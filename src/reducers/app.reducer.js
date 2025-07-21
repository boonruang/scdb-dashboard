import {
  SHOW_SIDEBAR,
  SET_MAP_CONFIG,
  QUERY_SUCCESS,
} from '../constants'

const initialState = {
  appName: 'herbhuk',
  loaded: false,
  isSidebar: true,
  isFarmerDetailbox: false,
};

const appReducer= (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_SIDEBAR:
      return {
        ...state,
        isSidebar: payload
        }         
    case QUERY_SUCCESS:
      return {
        ...state,
        test: payload,
        }            
    default:
      return state
  }
}

export default appReducer
