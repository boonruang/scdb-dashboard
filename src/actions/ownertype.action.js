import {
  HTTP_OWNERTYPE_FAILED,
  HTTP_OWNERTYPE_FETCHING,
  HTTP_OWNERTYPE_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateOwnertypeToSuccess = (payload) => ({
  type: HTTP_OWNERTYPE_SUCCESS,
  payload
});

const setStateOwnertypeToFetching = () => ({
  type: HTTP_OWNERTYPE_FETCHING
});

const setStateOwnertypeToFailed = () => ({
  type: HTTP_OWNERTYPE_FAILED
});



export const deleteOwnertype = (id) => {
  return async (dispatch) => {
    dispatch(setStateOwnertypeToFetching());
    await httpClient.delete(`${server.OWNERTYPE_URL}/${id}`);
    await doGetOwnertype(dispatch);
  };
};

const doGetOwnertype = (dispatch) => {
  httpClient
    .get(`${server.OWNERTYPE_URL}/list/all`)
    .then((result) => {
      dispatch(setStateOwnertypeToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateOwnertypeToFailed());
    });
};

export const getOwnertype = () => {
  return (dispatch) => {
    dispatch(setStateOwnertypeToFetching());
    setGetOwnertype(dispatch);
  };
};

const setGetOwnertype = (dispatch) => {
  httpClient
    .get(`${server.OWNERTYPE_URL}/list`)
    .then((result) => {
      dispatch(setStateOwnertypeToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateOwnertypeToFailed());
    });
};