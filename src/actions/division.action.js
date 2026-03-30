import { HTTP_DIVISION_FAILED, HTTP_DIVISION_FETCHING, HTTP_DIVISION_SUCCESS, server } from '../constants'
import { httpClient } from '../utils/HttpClient'

const setSuccess = (payload) => ({ type: HTTP_DIVISION_SUCCESS, payload })
const setFetching = () => ({ type: HTTP_DIVISION_FETCHING })
const setFailed = () => ({ type: HTTP_DIVISION_FAILED })

export const getDivision = () => {
  return function(dispatch) {
    dispatch(setFetching())
    httpClient.get(server.DIVISION_URL + '/list')
      .then(function(res) { dispatch(setSuccess(res.data)) })
      .catch(function() { dispatch(setFailed()) })
  }
}

export const addDivision = (navigate, formData) => {
  return async function(dispatch) {
    try {
      await httpClient.post(server.DIVISION_URL, formData)
      navigate('/division')
    } catch (e) {
      console.log('addDivision error:', e.toString())
    }
  }
}

export const deleteDivision = (id) => {
  return async function(dispatch) {
    dispatch(setFetching())
    await httpClient.delete(server.DIVISION_URL + '/' + id)
    dispatch(getDivision())
  }
}
