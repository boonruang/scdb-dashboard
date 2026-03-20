import {
  HTTP_DASHBOARD2_FAILED,
  HTTP_DASHBOARD2_FETCHING,
  HTTP_DASHBOARD2_SUCCESS,
  server
} from '../constants'
import { httpClient } from '../utils/HttpClient'

export const getDashboard2Summary = (filters) => async (dispatch) => {
  dispatch({ type: HTTP_DASHBOARD2_FETCHING })
  try {
    var params = new URLSearchParams()
    var f = filters || {}
    if (f.year) params.append('year', f.year)
    if (f.grantType) params.append('grantType', f.grantType)
    if (f.activityType) params.append('activityType', f.activityType)
    var query = params.toString()
    var url = server.DASHBOARD2_URL + '/summary' + (query ? '?' + query : '')
    var res = await httpClient.get(url)
    dispatch({ type: HTTP_DASHBOARD2_SUCCESS, payload: res.data })
  } catch (error) {
    dispatch({ type: HTTP_DASHBOARD2_FAILED })
  }
}

// Keep old name for backward compatibility
export const getDashboard = () => getDashboard2Summary({})
