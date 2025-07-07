import {
  HTTP_STANDARDTYPE_FAILED,
  HTTP_STANDARDTYPE_FETCHING,
  HTTP_STANDARDTYPE_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateStandardtypeToSuccess = (payload) => ({
  type: HTTP_STANDARDTYPE_SUCCESS,
  payload
});

const setStateStandardtypeToFetching = () => ({
  type: HTTP_STANDARDTYPE_FETCHING
});

const setStateStandardtypeToFailed = () => ({
  type: HTTP_STANDARDTYPE_FAILED
});


export const deleteStandardtype = (id) => {
  return async (dispatch) => {
    dispatch(setStateStandardtypeToFetching());
    await httpClient.delete(`${server.STANDARDTYPE_URL}/${id}`);
    await doGetStandardtype(dispatch);
  };
};

const doGetStandardtype = (dispatch) => {
  httpClient
    .get(`${server.STANDARDTYPE_URL}/list/all`)
    .then((result) => {
      dispatch(setStateStandardtypeToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateStandardtypeToFailed());
    });
};

export const getStandardtype = () => {
  return (dispatch) => {
    dispatch(setStateStandardtypeToFetching());
    setGetStandardtype(dispatch);
  };
};

const setGetStandardtype = (dispatch) => {
  httpClient
    .get(`${server.STANDARDTYPE_URL}/list`)
    .then((result) => {
      dispatch(setStateStandardtypeToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateStandardtypeToFailed());
    });
};