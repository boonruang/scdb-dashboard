import {
  HTTP_AUTHORPROFILE_FETCHING,
  HTTP_AUTHORPROFILE_SUCCESS,
  HTTP_AUTHORPROFILE_FAILED,
} from '../constants'

const initialState = { result: null, isFetching: false, isError: false }

const authorProfileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_AUTHORPROFILE_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false }
    case HTTP_AUTHORPROFILE_SUCCESS:
      return { ...state, result: payload.result, isFetching: false, isError: false }
    case HTTP_AUTHORPROFILE_FAILED:
      return { ...state, result: null, isFetching: false, isError: true }
    default:
      return state
  }
}

export default authorProfileReducer
