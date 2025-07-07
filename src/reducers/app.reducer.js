import KeplerGlSchema from '@kepler.gl/schemas';

import {
  SHOW_SIDEBAR,
  SET_MAP_CONFIG,
  QUERY_SUCCESS,
  // SHOW_FARMER_DETIALBOX,
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
    case SET_MAP_CONFIG:
      return {
        ...state,
        mapConfig: KeplerGlSchema.getConfigToSave(payload)
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
