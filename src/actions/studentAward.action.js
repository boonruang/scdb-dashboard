import {
  HTTP_STUDENTAWARD_FETCHING,
  HTTP_STUDENTAWARD_SUCCESS,
  HTTP_STUDENTAWARD_FAILED,
  server,
} from '../constants'
import { httpClient } from '../utils/HttpClient'

const setStateStudentAwardToSuccess = (payload) => ({
  type: HTTP_STUDENTAWARD_SUCCESS,
  payload
})

const setStateStudentAwardToFetching = () => ({
  type: HTTP_STUDENTAWARD_FETCHING
})

const setStateStudentAwardToFailed = () => ({
  type: HTTP_STUDENTAWARD_FAILED
})

const doGetStudentAward = (dispatch) => {
  httpClient
    .get(`${server.STUDENTAWARD_URL}/list`)
    .then((result) => {
      dispatch(setStateStudentAwardToSuccess(result.data))
    })
    .catch((error) => {
      alert(JSON.stringify(error))
      dispatch(setStateStudentAwardToFailed())
    })
}

export const getStudentAwards = () => {
  return (dispatch) => {
    dispatch(setStateStudentAwardToFetching())
    doGetStudentAward(dispatch)
  }
}

export const getStudentAwardById = (id) => {
  return (dispatch) => {
    dispatch(setStateStudentAwardToFetching())
    httpClient
      .get(`${server.STUDENTAWARD_URL}/${id}`)
      .then((result) => {
        dispatch(setStateStudentAwardToSuccess(result.data))
      })
      .catch((error) => {
        console.log(error)
        dispatch(setStateStudentAwardToFailed())
      })
  }
}

export const deleteStudentAward = (id) => {
  return async (dispatch) => {
    dispatch(setStateStudentAwardToFetching())
    await httpClient.delete(`${server.STUDENTAWARD_URL}/${id}`)
    await doGetStudentAward(dispatch)
  }
}

export const addStudentAward = (navigate, formData) => {
  return async (dispatch) => {
    try {
      let result = await httpClient.post(server.STUDENTAWARD_URL, formData)
      console.log('addStudentAward formData successfully: ', result)
      return { success: true, data: result.data }
    } catch (error) {
      console.log('addStudentAward formData Error: ', error.toString())
      return { success: false, error: error.message || error.toString() }
    }
  }
}

export const updateStudentAward = (navigate, formData, id) => {
  return async (dispatch) => {
    try {
      let result = await httpClient.put(`${server.STUDENTAWARD_URL}/${id}`, formData)
      console.log('updateStudentAward formData successfully: ', result)
      return { success: true, data: result.data }
    } catch (error) {
      console.log('updateStudentAward formData Error: ', error.toString())
      return { success: false, error: error.message || error.toString() }
    }
  }
}

export const bulkImportStudentAward = (records) => async () => {
  try {
    const res = await httpClient.post(`${server.STUDENTAWARD_URL}/bulk`, { records })
    return res.data
  } catch (error) {
    return { status: 'nok', result: String(error) }
  }
}
