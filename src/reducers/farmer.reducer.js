import {
  HTTP_FARMER_FAILED,
  HTTP_FARMER_FETCHING,
  HTTP_FARMER_SUCCESS,
  HTTP_FARMER_CHANGE_PASSWORD_SUCCESS,
  HTTP_FARMER_CHANGE_PASSWORD_FAILURE,
  HTTP_FARMER_SELFREGISTER_SUCCESS,
  HTTP_FARMER_SELFREGISTER_FAILURE,
} from '../constants';

const initialState = {
  pagination: null,
  result: null,
  isFetching: false,
  isError: false,
  isChangeSuccess: false,
  isRegisterSuccess: false,
};

const farmerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_FARMER_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HTTP_FARMER_SUCCESS:
      return { ...state, result: payload.result, pagination: payload?.pagination, isFetching: false, isError: false, isChangeSuccess: false, isRegisterSuccess: false };
    case HTTP_FARMER_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case HTTP_FARMER_CHANGE_PASSWORD_SUCCESS:
      return { ...state, isChangeSuccess: true };
    case HTTP_FARMER_CHANGE_PASSWORD_FAILURE:
      return { ...state, isChangeSuccess: false };
    case HTTP_FARMER_SELFREGISTER_SUCCESS:
      return { ...state, isRegisterSuccess: true };
    case HTTP_FARMER_SELFREGISTER_FAILURE:
      return { ...state, isRegisterSuccess: false };
    default:
      return state;
  }
};

export default farmerReducer
