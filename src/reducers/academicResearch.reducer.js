import {
  HTTP_ACADEMICRESEARCH_FETCHING,
  HTTP_ACADEMICRESEARCH_SUCCESS,
  HTTP_ACADEMICRESEARCH_FAILED,
} from '../constants'

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
}

const academicResearchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_ACADEMICRESEARCH_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false }
    case HTTP_ACADEMICRESEARCH_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false }
    case HTTP_ACADEMICRESEARCH_FAILED:
      return { ...state, result: null, isFetching: false, isError: true }
    default:
      return state
  }
}

export default academicResearchReducer
