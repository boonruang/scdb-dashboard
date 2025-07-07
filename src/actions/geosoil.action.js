import {
  HTTP_GEOSOIL_FAILED,
  HTTP_GEOSOIL_FETCHING,
  HTTP_GEOSOIL_SUCCESS,
  HTTP_GEOSOIL_SELECTED_SUCCESS,
  HTTP_GEOSOIL_SELECTED_FAILED,
  HTTP_GEOSOIL_SELECTED_FETCHING,  
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateGeoSoilToSuccess = (payload) => ({
  type: HTTP_GEOSOIL_SUCCESS,
  payload
});

const setStateGeoSoilToFetching = () => ({
  type: HTTP_GEOSOIL_FETCHING
});

const setStateGeoSoilToFailed = () => ({
  type: HTTP_GEOSOIL_FAILED
});

export const setStateGeoSoilSelectedToFetching = () => ({
  type: HTTP_GEOSOIL_SELECTED_FETCHING
});

export const setStateGeoSoilSelectedToSuccess = (payload) => ({
  type: HTTP_GEOSOIL_SELECTED_SUCCESS,
  payload
});

const setStateGeoSoilSelectedToFailed = () => ({
  type: HTTP_GEOSOIL_SELECTED_FAILED
});

export const getGeoSoilById = (id) => {
  return (dispatch) => {
    dispatch(setStateGeoSoilSelectedToFetching());
    httpClient
      .get(`${server.GEOSOIL_URL}/list/${id}`)
      .then((result) => {
        dispatch(setStateGeoSoilSelectedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateGeoSoilSelectedToFailed());
      });
  };
};

export const getGeoSoilByKeyword = (searchTerm) => {
  console.log('getGeoSoilByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getGeoSoilByKeyword dispatch is called ',keyword)
    dispatch(setStateGeoSoilToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.GEOSOIL_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateGeoSoilToSuccess(result.data));
          console.log('setStateGeoSoilToSuccess is called ',result.data)
        });
        } 
        else {
          doGetGeoSoils(dispatch);
        }
  };
};

export const deleteGeoSoil = (id) => {
  return async (dispatch) => {
    dispatch(setStateGeoSoilToFetching());
    await httpClient.delete(`${server.GEOSOIL_URL}/${id}`);
    await doGetGeoSoils(dispatch);
  };
};

export const getGeoSoils = () => {
  return (dispatch) => {
    dispatch(setStateGeoSoilToFetching());
    doGetGeoSoils(dispatch);
  };
};

const doGetGeoSoils = (dispatch) => {
  httpClient
    .get(`${server.GEOSOIL_URL}/list/all`)
    .then((result) => {
      dispatch(setStateGeoSoilToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateGeoSoilToFailed());
    });
};

