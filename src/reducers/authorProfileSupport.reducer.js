import {
  HTTP_AUTHORPROFILESUPPORT_FETCHING,
  HTTP_AUTHORPROFILESUPPORT_SUCCESS,
  HTTP_AUTHORPROFILESUPPORT_FAILED,
} from '../constants'

const initialState = { result: null, isFetching: false, isError: false }

const authorProfileSupportReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_AUTHORPROFILESUPPORT_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false }
    case HTTP_AUTHORPROFILESUPPORT_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false }
    case HTTP_AUTHORPROFILESUPPORT_FAILED:
      return { ...state, result: null, isFetching: false, isError: true }
    default:
      return state
  }
}

export default authorProfileSupportReducer
