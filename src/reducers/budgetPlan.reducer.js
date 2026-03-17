import { HTTP_BUDGET_PLAN_FETCHING, HTTP_BUDGET_PLAN_SUCCESS, HTTP_BUDGET_PLAN_FAILED } from '../constants'

const initialState = { result: null, isFetching: false, isError: false }

const budgetPlanReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_BUDGET_PLAN_FETCHING: return { ...state, result: null, isFetching: true, isError: false }
    case HTTP_BUDGET_PLAN_SUCCESS:  return { ...state, result: payload.result, isFetching: false, isError: false }
    case HTTP_BUDGET_PLAN_FAILED:   return { ...state, result: null, isFetching: false, isError: true }
    default: return state
  }
}

export default budgetPlanReducer
