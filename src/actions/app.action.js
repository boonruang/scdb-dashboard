import {ActionTypes} from '@kepler.gl/actions';

import {
  SHOW_SIDEBAR,
  SET_MAP_CONFIG,
  QUERY_SUCCESS,
  // SHOW_FARMER_DETIALBOX,
  // SET_MAP_PERSPECTIVE
} from '../constants'


export const showSidebar = (payload) => ({
  type: SHOW_SIDEBAR,
  payload
})

export const setMapConfig = () => ({
  type: SET_MAP_CONFIG,
})

export const querySuccess = () => ({
  type: QUERY_SUCCESS,
})

// export const updateKeplerMap = (payload) => ({
//   type: ActionTypes.UPDATE_MAP,
//   payload
// })

// export const setFarmerDetailbox = (payload) => ({
//   type: SHOW_FARMER_DETIALBOX,
//   payload
// })

// export const setMapPerspective = (payload) => ({
//   type: SET_MAP_PERSPECTIVE,
//   payload
// })