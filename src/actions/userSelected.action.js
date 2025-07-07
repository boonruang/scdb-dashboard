import {
  HTTP_USER_SELECTED_FAILED,
  HTTP_USER_SELECTED_FETCHING,
  HTTP_USER_SELECTED_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateUserToSuccess = (payload) => ({
  type: HTTP_USER_SELECTED_SUCCESS,
  payload
});

const setStateUserToFetching = () => ({
  type: HTTP_USER_SELECTED_FETCHING
});

const setStateUserToFailed = () => ({
  type: HTTP_USER_SELECTED_FAILED
});


export const getUser = (id) => {
  return async (dispatch) => {
    dispatch(setStateUserToFetching());
    httpClient
    .get(`${server.USER_URL}/${id}`)
    .then((result) => {
      dispatch(setStateUserToSuccess(result.data));
      console.log('setStateUserToSuccess is called ',result.data)
    });
  };
};

