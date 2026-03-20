import {
  HTTP_STUDENTACTIVITY_FETCHING,
  HTTP_STUDENTACTIVITY_SUCCESS,
  HTTP_STUDENTACTIVITY_FAILED,
  server,
} from '../constants'
import { httpClient } from '../utils/HttpClient'

const setStateStudentActivityToSuccess = (payload) => ({
  type: HTTP_STUDENTACTIVITY_SUCCESS,
  payload
})

const setStateStudentActivityToFetching = () => ({
  type: HTTP_STUDENTACTIVITY_FETCHING
})

const setStateStudentActivityToFailed = () => ({
  type: HTTP_STUDENTACTIVITY_FAILED
})

const doGetStudentActivity = (dispatch) => {
  httpClient
    .get(`${server.STUDENTACTIVITY_URL}/list`)
    .then((result) => {
      dispatch(setStateStudentActivityToSuccess(result.data))
    })
    .catch((error) => {
      alert(JSON.stringify(error))
      dispatch(setStateStudentActivityToFailed())
    })
}

export const getStudentActivities = () => {
  return (dispatch) => {
    dispatch(setStateStudentActivityToFetching())
    doGetStudentActivity(dispatch)
  }
}

export const getStudentActivityById = (id) => {
  return (dispatch) => {
    dispatch(setStateStudentActivityToFetching())
    httpClient
      .get(`${server.STUDENTACTIVITY_URL}/${id}`)
      .then((result) => {
        dispatch(setStateStudentActivityToSuccess(result.data))
      })
      .catch((error) => {
        console.log(error)
        dispatch(setStateStudentActivityToFailed())
      })
  }
}

export const deleteStudentActivity = (id) => {
  return async (dispatch) => {
    dispatch(setStateStudentActivityToFetching())
    await httpClient.delete(`${server.STUDENTACTIVITY_URL}/${id}`)
    await doGetStudentActivity(dispatch)
  }
}

export const addStudentActivity = (navigate, formData) => {
  return async (dispatch) => {
    try {
      let result = await httpClient.post(server.STUDENTACTIVITY_URL, formData)
      console.log('addStudentActivity formData successfully: ', result)
      return { success: true, data: result.data }
    } catch (error) {
      console.log('addStudentActivity formData Error: ', error.toString())
      return { success: false, error: error.message || error.toString() }
    }
  }
}

export const updateStudentActivity = (navigate, formData, id) => {
  return async (dispatch) => {
    try {
      let result = await httpClient.put(`${server.STUDENTACTIVITY_URL}/${id}`, formData)
      console.log('updateStudentActivity formData successfully: ', result)
      return { success: true, data: result.data }
    } catch (error) {
      console.log('updateStudentActivity formData Error: ', error.toString())
      return { success: false, error: error.message || error.toString() }
    }
  }
}

export const bulkImportStudentActivity = (records) => async () => {
  try {
    const res = await httpClient.post(`${server.STUDENTACTIVITY_URL}/bulk`, { records })
    return res.data
  } catch (error) {
    return { status: 'nok', result: String(error) }
  }
}
