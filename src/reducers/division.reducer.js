import { HTTP_DIVISION_FAILED, HTTP_DIVISION_FETCHING, HTTP_DIVISION_SUCCESS } from '../constants'

const initialState = { result: null, isFetching: false, isError: false }

const divisionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_DIVISION_FETCHING: return { ...state, result: null, isFetching: true, isError: false }
    case HTTP_DIVISION_SUCCESS:  return { ...state, result: payload.result, isFetching: false, isError: false }
    case HTTP_DIVISION_FAILED:   return { ...state, result: null, isFetching: false, isError: true }
    default: return state
  }
}

export default divisionReducer
