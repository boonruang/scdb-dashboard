import {
  HTTP_ACADEMICGRANT_FETCHING,
  HTTP_ACADEMICGRANT_SUCCESS,
  HTTP_ACADEMICGRANT_FAILED,
} from '../constants'

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
}

const academicGrantReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_ACADEMICGRANT_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false }
    case HTTP_ACADEMICGRANT_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false }
    case HTTP_ACADEMICGRANT_FAILED:
      return { ...state, result: null, isFetching: false, isError: true }
    default:
      return state
  }
}

export default academicGrantReducer
