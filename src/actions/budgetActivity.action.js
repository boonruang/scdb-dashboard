import {
  HTTP_BUDGET_ACTIVITY_FETCHING,
  HTTP_BUDGET_ACTIVITY_SUCCESS,
  HTTP_BUDGET_ACTIVITY_FAILED,
  server
} from '../constants'
import { httpClient } from '../utils/HttpClient'

const setStateFetching = () => ({ type: HTTP_BUDGET_ACTIVITY_FETCHING })
const setStateSuccess  = (payload) => ({ type: HTTP_BUDGET_ACTIVITY_SUCCESS, payload })
const setStateFailed   = () => ({ type: HTTP_BUDGET_ACTIVITY_FAILED })

export const getBudgetActivity = (budgetCode) => (dispatch) => {
  dispatch(setStateFetching())
  const params = budgetCode ? { params: { budget_code: budgetCode } } : {}
  httpClient
    .get(`${server.BUDGET_ACTIVITY_URL}/list`, params)
    .then((result) => dispatch(setStateSuccess(result.data)))
    .catch(() => dispatch(setStateFailed()))
}

export const deleteBudgetActivity = (id) => async (dispatch) => {
  dispatch(setStateFetching())
  await httpClient.delete(`${server.BUDGET_ACTIVITY_URL}/${id}`)
  dispatch(getBudgetActivity())
}

export const addBudgetActivity = (navigate, formData) => async () => {
  try {
    let result = await httpClient.post(server.BUDGET_ACTIVITY_URL, formData)
    return { success: result.data.status === 'ok', data: result.data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const updateBudgetActivity = (navigate, formData) => async () => {
  try {
    let result = await httpClient.put(server.BUDGET_ACTIVITY_URL, formData)
    return { success: result.data.status === 'ok', data: result.data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const bulkImportBudgetActivity = (dataArray) => async () => {
  try {
    let result = await httpClient.post(`${server.BUDGET_ACTIVITY_URL}/bulk`, dataArray)
    return { success: result.data.status === 'ok', data: result.data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
