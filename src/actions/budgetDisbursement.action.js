import {
  HTTP_BUDGET_DISBURSEMENT_FETCHING,
  HTTP_BUDGET_DISBURSEMENT_SUCCESS,
  HTTP_BUDGET_DISBURSEMENT_FAILED,
  server
} from '../constants'
import { httpClient } from '../utils/HttpClient'

const setStateFetching = () => ({ type: HTTP_BUDGET_DISBURSEMENT_FETCHING })
const setStateSuccess  = (payload) => ({ type: HTTP_BUDGET_DISBURSEMENT_SUCCESS, payload })
const setStateFailed   = () => ({ type: HTTP_BUDGET_DISBURSEMENT_FAILED })

export const getBudgetDisbursement = (activityCode) => (dispatch) => {
  dispatch(setStateFetching())
  const params = activityCode ? { params: { activity_code: activityCode } } : {}
  httpClient
    .get(`${server.BUDGET_DISBURSEMENT_URL}/list`, params)
    .then((result) => dispatch(setStateSuccess(result.data)))
    .catch(() => dispatch(setStateFailed()))
}

export const deleteBudgetDisbursement = (id) => async (dispatch) => {
  dispatch(setStateFetching())
  await httpClient.delete(`${server.BUDGET_DISBURSEMENT_URL}/${id}`)
  dispatch(getBudgetDisbursement())
}

export const addBudgetDisbursement = (navigate, formData) => async () => {
  try {
    let result = await httpClient.post(server.BUDGET_DISBURSEMENT_URL, formData)
    return { success: result.data.status === 'ok', data: result.data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const updateBudgetDisbursement = (navigate, formData) => async () => {
  try {
    let result = await httpClient.put(server.BUDGET_DISBURSEMENT_URL, formData)
    return { success: result.data.status === 'ok', data: result.data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const validateActivityCodes = (activityCodes) => async () => {
  try {
    const result = await httpClient.post(`${server.BUDGET_DISBURSEMENT_URL}/validate-activity-codes`, { activityCodes })
    return result.data
  } catch (error) {
    return { missing: [] }
  }
}

export const bulkImportBudgetDisbursement = (dataArray) => async () => {
  try {
    let result = await httpClient.post(`${server.BUDGET_DISBURSEMENT_URL}/bulk`, dataArray)
    return { success: result.data.status === 'ok', data: result.data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
