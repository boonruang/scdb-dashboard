import {
  HTTP_PRODUCTTYPE_FAILED,
  HTTP_PRODUCTTYPE_FETCHING,
  HTTP_PRODUCTTYPE_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateProducttypeToSuccess = (payload) => ({
  type: HTTP_PRODUCTTYPE_SUCCESS,
  payload
});

const setStateProducttypeToFetching = () => ({
  type: HTTP_PRODUCTTYPE_FETCHING
});

const setStateProducttypeToFailed = () => ({
  type: HTTP_PRODUCTTYPE_FAILED
});


export const deleteProducttype = (id) => {
  return async (dispatch) => {
    dispatch(setStateProducttypeToFetching());
    await httpClient.delete(`${server.PRODUCTTYPE_URL}/${id}`);
    await doGetProducttype(dispatch);
  };
};

const doGetProducttype = (dispatch) => {
  httpClient
    .get(`${server.PRODUCTTYPE_URL}/list/all`)
    .then((result) => {
      dispatch(setStateProducttypeToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateProducttypeToFailed());
    });
};

export const getProducttype = () => {
  return (dispatch) => {
    dispatch(setStateProducttypeToFetching());
    setGetProducttype(dispatch);
  };
};

const setGetProducttype = (dispatch) => {
  httpClient
    .get(`${server.PRODUCTTYPE_URL}/list`)
    .then((result) => {
      dispatch(setStateProducttypeToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateProducttypeToFailed());
    });
};