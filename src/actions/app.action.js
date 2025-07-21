import {
  SHOW_SIDEBAR,
  SET_MAP_CONFIG,
  QUERY_SUCCESS,
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
