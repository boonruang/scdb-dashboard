import {
  HTTP_PRODUCETYPE_FAILED,
  HTTP_PRODUCETYPE_FETCHING,
  HTTP_PRODUCETYPE_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateProducetypeToSuccess = (payload) => ({
  type: HTTP_PRODUCETYPE_SUCCESS,
  payload
});

const setStateProducetypeToFetching = () => ({
  type: HTTP_PRODUCETYPE_FETCHING
});

const setStateProducetypeToFailed = () => ({
  type: HTTP_PRODUCETYPE_FAILED
});


export const deleteProducetype = (id) => {
  return async (dispatch) => {
    dispatch(setStateProducetypeToFetching());
    await httpClient.delete(`${server.PRODUCETYPE_URL}/${id}`);
    await doGetProducetype(dispatch);
  };
};

const doGetProducetype = (dispatch) => {
  httpClient
    .get(`${server.PRODUCETYPE_URL}/list/all`)
    .then((result) => {
      dispatch(setStateProducetypeToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateProducetypeToFailed());
    });
};

export const getProducetype = () => {
  return (dispatch) => {
    dispatch(setStateProducetypeToFetching());
    setGetProducetype(dispatch);
  };
};

const setGetProducetype = (dispatch) => {
  httpClient
    .get(`${server.PRODUCETYPE_URL}/list`)
    .then((result) => {
      dispatch(setStateProducetypeToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateProducetypeToFailed());
    });
};