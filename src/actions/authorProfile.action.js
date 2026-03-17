import {
  HTTP_AUTHORPROFILE_FETCHING,
  HTTP_AUTHORPROFILE_SUCCESS,
  HTTP_AUTHORPROFILE_FAILED,
  server,
} from '../constants'
import { httpClient } from '../utils/HttpClient'

const setFetching = () => ({ type: HTTP_AUTHORPROFILE_FETCHING })
const setSuccess = (payload) => ({ type: HTTP_AUTHORPROFILE_SUCCESS, payload })
const setFailed = () => ({ type: HTTP_AUTHORPROFILE_FAILED })

export const getAuthorProfiles = () => async (dispatch) => {
  dispatch(setFetching())
  try {
    const res = await httpClient.get(`${server.STAFF_URL}/list`)
    dispatch(setSuccess(res.data))
  } catch {
    dispatch(setFailed())
  }
}

export const bulkUpdateAuthorProfile = (records) => async () => {
  try {
    const res = await httpClient.post(`${server.STAFF_URL}/bulkupdateprofile`, records)
    return res.data
  } catch (error) {
    return { status: 'nok', result: String(error) }
  }
}

export const bulkImportPublication = (records) => async () => {
  try {
    const res = await httpClient.post(`${server.PUBLICATION_URL}/bulk`, records)
    return res.data
  } catch (error) {
    return { status: 'nok', result: String(error) }
  }
}
