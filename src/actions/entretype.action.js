import {
  HTTP_ENTRETYPE_FAILED,
  HTTP_ENTRETYPE_FETCHING,
  HTTP_ENTRETYPE_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateEntretypeToSuccess = (payload) => ({
  type: HTTP_ENTRETYPE_SUCCESS,
  payload
});

const setStateEntretypeToFetching = () => ({
  type: HTTP_ENTRETYPE_FETCHING
});

const setStateEntretypeToFailed = () => ({
  type: HTTP_ENTRETYPE_FAILED
});



export const deleteEntretype = (id) => {
  return async (dispatch) => {
    dispatch(setStateEntretypeToFetching());
    await httpClient.delete(`${server.ENTRETYPE_URL}/${id}`);
    await doGetEntretype(dispatch);
  };
};

const doGetEntretype = (dispatch) => {
  httpClient
    .get(`${server.ENTRETYPE_URL}/list/all`)
    .then((result) => {
      dispatch(setStateEntretypeToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateEntretypeToFailed());
    });
};

export const getEntretype = () => {
  return (dispatch) => {
    dispatch(setStateEntretypeToFetching());
    setGetEntretype(dispatch);
  };
};

const setGetEntretype = (dispatch) => {
  httpClient
    .get(`${server.ENTRETYPE_URL}/list`)
    .then((result) => {
      dispatch(setStateEntretypeToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateEntretypeToFailed());
    });
};