import {
  HTTP_BUDGET_PLAN_FETCHING,
  HTTP_BUDGET_PLAN_SUCCESS,
  HTTP_BUDGET_PLAN_FAILED,
  server
} from '../constants'
import { httpClient } from '../utils/HttpClient'

const setStateFetching = () => ({ type: HTTP_BUDGET_PLAN_FETCHING })
const setStateSuccess  = (payload) => ({ type: HTTP_BUDGET_PLAN_SUCCESS, payload })
const setStateFailed   = () => ({ type: HTTP_BUDGET_PLAN_FAILED })

export const getBudgetPlan = () => (dispatch) => {
  dispatch(setStateFetching())
  httpClient
    .get(`${server.BUDGET_PLAN_URL}/list`)
    .then((result) => dispatch(setStateSuccess(result.data)))
    .catch(() => dispatch(setStateFailed()))
}

export const deleteBudgetPlan = (id) => async (dispatch) => {
  dispatch(setStateFetching())
  await httpClient.delete(`${server.BUDGET_PLAN_URL}/${id}`)
  dispatch(getBudgetPlan())
}

export const addBudgetPlan = (navigate, formData) => async () => {
  try {
    let result = await httpClient.post(server.BUDGET_PLAN_URL, formData)
    return { success: result.data.status === 'ok', data: result.data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const updateBudgetPlan = (navigate, formData) => async () => {
  try {
    let result = await httpClient.put(server.BUDGET_PLAN_URL, formData)
    return { success: result.data.status === 'ok', data: result.data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const bulkImportBudgetPlan = (dataArray) => async () => {
  try {
    let result = await httpClient.post(`${server.BUDGET_PLAN_URL}/bulk`, dataArray)
    return { success: result.data.status === 'ok', data: result.data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
