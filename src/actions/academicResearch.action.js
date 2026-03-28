import {
  HTTP_ACADEMICRESEARCH_FETCHING,
  HTTP_ACADEMICRESEARCH_SUCCESS,
  HTTP_ACADEMICRESEARCH_FAILED,
  server,
} from '../constants'
import { httpClient } from '../utils/HttpClient'

const setStateToSuccess = (payload) => ({ type: HTTP_ACADEMICRESEARCH_SUCCESS, payload })
const setStateToFetching = () => ({ type: HTTP_ACADEMICRESEARCH_FETCHING })
const setStateToFailed = () => ({ type: HTTP_ACADEMICRESEARCH_FAILED })

const doGetList = (dispatch, degree) => {
  var url = degree
    ? `${server.ACADEMICRESEARCH_URL}/list?degree=${encodeURIComponent(degree)}`
    : `${server.ACADEMICRESEARCH_URL}/list`
  httpClient
    .get(url)
    .then((result) => { dispatch(setStateToSuccess(result.data)) })
    .catch((error) => {
      alert(JSON.stringify(error))
      dispatch(setStateToFailed())
    })
}

export const getAcademicResearchList = (degree) => {
  return (dispatch) => {
    dispatch(setStateToFetching())
    doGetList(dispatch, degree)
  }
}

export const getAcademicResearchById = (id) => {
  return (dispatch) => {
    dispatch(setStateToFetching())
    httpClient
      .get(`${server.ACADEMICRESEARCH_URL}/${id}`)
      .then((result) => { dispatch(setStateToSuccess(result.data)) })
      .catch((error) => {
        console.log(error)
        dispatch(setStateToFailed())
      })
  }
}

export const deleteAcademicResearch = (id, degree) => {
  return async (dispatch) => {
    dispatch(setStateToFetching())
    await httpClient.delete(`${server.ACADEMICRESEARCH_URL}/${id}`)
    await doGetList(dispatch, degree)
  }
}

export const addAcademicResearch = (data) => {
  return async (dispatch) => {
    try {
      let result = await httpClient.post(server.ACADEMICRESEARCH_URL, data)
      return { success: true, data: result.data }
    } catch (error) {
      return { success: false, error: error.message || error.toString() }
    }
  }
}

export const updateAcademicResearch = (id, data) => {
  return async (dispatch) => {
    try {
      let result = await httpClient.put(`${server.ACADEMICRESEARCH_URL}/${id}`, data)
      return { success: true, data: result.data }
    } catch (error) {
      return { success: false, error: error.message || error.toString() }
    }
  }
}
