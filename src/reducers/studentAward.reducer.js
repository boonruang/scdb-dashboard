import {
  HTTP_STUDENTAWARD_FETCHING,
  HTTP_STUDENTAWARD_SUCCESS,
  HTTP_STUDENTAWARD_FAILED,
} from '../constants'

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
}

const studentAwardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_STUDENTAWARD_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false }
    case HTTP_STUDENTAWARD_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false }
    case HTTP_STUDENTAWARD_FAILED:
      return { ...state, result: null, isFetching: false, isError: true }
    default:
      return state
  }
}

export default studentAwardReducer
