import {
  HTTP_LOG_FAILED,
  HTTP_LOG_FETCHING,
  HTTP_LOG_SUCCESS,
  HTTP_LOG_SELECTED_SUCCESS,
  HTTP_LOG_SELECTED_FAILED,
  HTTP_LOG_SELECTED_FETCHING,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateLogToSuccess = (payload) => ({
  type: HTTP_LOG_SUCCESS,
  payload
});

const setStateLogToFetching = () => ({
  type: HTTP_LOG_FETCHING
});

const setStateLogToFailed = () => ({
  type: HTTP_LOG_FAILED
});


export const setStateLogSelectedToFetching = () => ({
  type: HTTP_LOG_SELECTED_FETCHING
});

export const setStateLogSelectedToSuccess = (payload) => ({
  type: HTTP_LOG_SELECTED_SUCCESS,
  payload
});

const setStateLogSelectedToFailed = () => ({
  type: HTTP_LOG_SELECTED_FAILED
});

export const getLogById = (id) => {
  return (dispatch) => {
    dispatch(setStateLogSelectedToFetching());
    httpClient
      .get(`${server.LOG_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateLogSelectedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateLogSelectedToFailed());
      });
  };
};


export const getLogByKeyword = (searchTerm) => {
  console.log('getLogByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getLogByKeyword dispatch is called ',keyword)
    dispatch(setStateLogToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.LOG_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateLogToSuccess(result.data));
          console.log('setStateLogToSuccess is called ',result.data)
        });
        } 
        else {
          doGetLog(dispatch);
        }
  };
};

export const deleteLog = (id) => {
  return async (dispatch) => {
    dispatch(setStateLogToFetching());
    await httpClient.delete(`${server.LOG_URL}/${id}`);
    await doGetLog(dispatch);
  };
};

export const getLog = () => {
  return (dispatch) => {
    dispatch(setStateLogToFetching());
    doGetLog(dispatch);
  };
};

const doGetLog = (dispatch) => {
  httpClient
    .get(`${server.LOG_URL}/list`)
    .then((result) => {
      dispatch(setStateLogToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateLogToFailed());
    });
};