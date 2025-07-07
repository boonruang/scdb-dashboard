import {
  HTTP_SERVICETYPE_FAILED,
  HTTP_SERVICETYPE_FETCHING,
  HTTP_SERVICETYPE_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateServicetypeToSuccess = (payload) => ({
  type: HTTP_SERVICETYPE_SUCCESS,
  payload
});

const setStateServicetypeToFetching = () => ({
  type: HTTP_SERVICETYPE_FETCHING
});

const setStateServicetypeToFailed = () => ({
  type: HTTP_SERVICETYPE_FAILED
});



export const deleteServicetype = (id) => {
  return async (dispatch) => {
    dispatch(setStateServicetypeToFetching());
    await httpClient.delete(`${server.SERVICETYPE_URL}/${id}`);
    await doGetServicetype(dispatch);
  };
};

const doGetServicetype = (dispatch) => {
  httpClient
    .get(`${server.SERVICETYPE_URL}/list/all`)
    .then((result) => {
      dispatch(setStateServicetypeToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateServicetypeToFailed());
    });
};

export const getServicetype = () => {
  return (dispatch) => {
    dispatch(setStateServicetypeToFetching());
    setGetServicetype(dispatch);
  };
};

const setGetServicetype = (dispatch) => {
  httpClient
    .get(`${server.SERVICETYPE_URL}/list`)
    .then((result) => {
      dispatch(setStateServicetypeToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateServicetypeToFailed());
    });
};