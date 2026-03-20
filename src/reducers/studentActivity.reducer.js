import {
  HTTP_STUDENTACTIVITY_FETCHING,
  HTTP_STUDENTACTIVITY_SUCCESS,
  HTTP_STUDENTACTIVITY_FAILED,
} from '../constants'

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
}

const studentActivityReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_STUDENTACTIVITY_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false }
    case HTTP_STUDENTACTIVITY_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false }
    case HTTP_STUDENTACTIVITY_FAILED:
      return { ...state, result: null, isFetching: false, isError: true }
    default:
      return state
  }
}

export default studentActivityReducer
