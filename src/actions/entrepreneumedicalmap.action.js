import {
  HTTP_ENTREPRENEURMEDICAL_MAP_SUCCESS,
  HTTP_ENTREPRENEURMEDICAL_MAP_FAILED,
  HTTP_ENTREPRENEURMEDICAL_MAP_FETCHING,  
  HTTP_ENTREPRENEURMEDICAL_SELECTED_SUCCESS,
  HTTP_ENTREPRENEURMEDICAL_SELECTED_FAILED,
  HTTP_ENTREPRENEURMEDICAL_SELECTED_FETCHING,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateEntrepreneurmedmapToSuccess = (payload) => ({
  type: HTTP_ENTREPRENEURMEDICAL_MAP_SUCCESS,
  payload
});

const setStateEntrepreneurmedmapToFetching = () => ({
  type: HTTP_ENTREPRENEURMEDICAL_MAP_FETCHING
});

const setStateEntrepreneurmedmapToFailed = () => ({
  type: HTTP_ENTREPRENEURMEDICAL_MAP_FAILED
});


export const setStateEntrepreneurmedmapSelectedToFetching = () => ({
  type: HTTP_ENTREPRENEURMEDICAL_SELECTED_FETCHING
});

export const setStateEntrepreneurmedmapSelectedToSuccess = (payload) => ({
  type: HTTP_ENTREPRENEURMEDICAL_SELECTED_SUCCESS,
  payload
});

const setStateEntrepreneurmedmapSelectedToFailed = () => ({
  type: HTTP_ENTREPRENEURMEDICAL_SELECTED_FAILED
});

export const getEntrepreneurmedmapById = (id) => {
  return (dispatch) => {
    dispatch(setStateEntrepreneurmedmapSelectedToFetching());
    httpClient
      .get(`${server.ENTREPRENEURMEDICAL_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateEntrepreneurmedmapSelectedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateEntrepreneurmedmapSelectedToFailed());
      });
  };
};


export const getEntrepreneurmedmapByKeyword = (searchTerm) => {
  console.log('getEntrepreneurmedmapByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getEntrepreneurmedmapByKeyword dispatch is called ',keyword)
    dispatch(setStateEntrepreneurmedmapToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.ENTREPRENEURMEDICAL_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateEntrepreneurmedmapToSuccess(result.data));
          console.log('setStateEntrepreneurmedmapToSuccess is called ',result.data)
        });
        } 
        else {
          doGetEntrepreneurmedmap(dispatch);
        }
  };
};


export const getEntrepreneurmedmap = () => {
  return (dispatch) => {
    dispatch(setStateEntrepreneurmedmapToFetching());
    doGetEntrepreneurmedmap(dispatch);
  };
};

const doGetEntrepreneurmedmap = (dispatch) => {
  httpClient
    .get(`${server.ENTREPRENEURMEDICAL_URL}/list/all`)
    .then((result) => {
      dispatch(setStateEntrepreneurmedmapToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateEntrepreneurmedmapToFailed());
    });
};