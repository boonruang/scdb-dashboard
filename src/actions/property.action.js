import {
  HTTP_PROPERTY_FAILED,
  HTTP_PROPERTY_FETCHING,
  HTTP_PROPERTY_SUCCESS,
  HTTP_PROPERTY_SELECTED_SUCCESS,
  HTTP_PROPERTY_SELECTED_FAILED,
  HTTP_PROPERTY_SELECTED_FETCHING,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStatePropertyToSuccess = (payload) => ({
  type: HTTP_PROPERTY_SUCCESS,
  payload
});

const setStatePropertyToFetching = () => ({
  type: HTTP_PROPERTY_FETCHING
});

const setStatePropertyToFailed = () => ({
  type: HTTP_PROPERTY_FAILED
});


export const setStatePropertySelectedToFetching = () => ({
  type: HTTP_PROPERTY_SELECTED_FETCHING
});

export const setStatePropertySelectedToSuccess = (payload) => ({
  type: HTTP_PROPERTY_SELECTED_SUCCESS,
  payload
});

const setStatePropertySelectedToFailed = () => ({
  type: HTTP_PROPERTY_SELECTED_FAILED
});

export const getPropertyById = (id) => {
  return (dispatch) => {
    dispatch(setStatePropertySelectedToFetching());
    httpClient
      .get(`${server.PROPERTY_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStatePropertySelectedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStatePropertySelectedToFailed());
      });
  };
};

export const getPropertyByKeyword = (searchTerm) => {
  console.log('getPropertyByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getPropertyByKeyword dispatch is called ',keyword)
    dispatch(setStatePropertyToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.PROPERTY_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStatePropertyToSuccess(result.data));
          console.log('setStatePropertyToSuccess is called ',result.data)
        });
        } 
        else {
          doGetPropertys(dispatch);
        }
  };
};

export const deleteProperty = (id) => {
  return async (dispatch) => {
    dispatch(setStatePropertyToFetching());
    await httpClient.delete(`${server.PROPERTY_URL}/${id}`);
    await doGetPropertys(dispatch);
  };
};

export const getPropertys = () => {
  return (dispatch) => {
    dispatch(setStatePropertyToFetching());
    doGetPropertys(dispatch);
  };
};

const doGetPropertys = (dispatch) => {
  httpClient
    .get(`${server.PROPERTY_URL}/list/all`)
    .then((result) => {
      dispatch(setStatePropertyToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStatePropertyToFailed());
    });
};

