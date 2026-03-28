import {
  HTTP_ACADEMICGRANT_FETCHING,
  HTTP_ACADEMICGRANT_SUCCESS,
  HTTP_ACADEMICGRANT_FAILED,
  server,
} from '../constants'
import { httpClient } from '../utils/HttpClient'

const setStateToSuccess = (payload) => ({ type: HTTP_ACADEMICGRANT_SUCCESS, payload })
const setStateToFetching = () => ({ type: HTTP_ACADEMICGRANT_FETCHING })
const setStateToFailed = () => ({ type: HTTP_ACADEMICGRANT_FAILED })

const doGetList = (dispatch) => {
  httpClient
    .get(`${server.ACADEMICGRANT_URL}/list`)
    .then((result) => { dispatch(setStateToSuccess(result.data)) })
    .catch((error) => {
      alert(JSON.stringify(error))
      dispatch(setStateToFailed())
    })
}

export const getAcademicGrantList = () => {
  return (dispatch) => {
    dispatch(setStateToFetching())
    doGetList(dispatch)
  }
}

export const getAcademicGrantById = (id) => {
  return (dispatch) => {
    dispatch(setStateToFetching())
    httpClient
      .get(`${server.ACADEMICGRANT_URL}/${id}`)
      .then((result) => { dispatch(setStateToSuccess(result.data)) })
      .catch((error) => {
        console.log(error)
        dispatch(setStateToFailed())
      })
  }
}

export const deleteAcademicGrant = (id) => {
  return async (dispatch) => {
    dispatch(setStateToFetching())
    await httpClient.delete(`${server.ACADEMICGRANT_URL}/${id}`)
    await doGetList(dispatch)
  }
}

export const addAcademicGrant = (data) => {
  return async (dispatch) => {
    try {
      let result = await httpClient.post(server.ACADEMICGRANT_URL, data)
      return { success: true, data: result.data }
    } catch (error) {
      return { success: false, error: error.message || error.toString() }
    }
  }
}

export const updateAcademicGrant = (id, data) => {
  return async (dispatch) => {
    try {
      let result = await httpClient.put(`${server.ACADEMICGRANT_URL}/${id}`, data)
      return { success: true, data: result.data }
    } catch (error) {
      return { success: false, error: error.message || error.toString() }
    }
  }
}
