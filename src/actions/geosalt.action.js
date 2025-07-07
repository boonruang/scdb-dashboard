import {
  HTTP_GEOSALT_FAILED,
  HTTP_GEOSALT_FETCHING,
  HTTP_GEOSALT_SUCCESS,
  HTTP_GEOSALT_SELECTED_SUCCESS,
  HTTP_GEOSALT_SELECTED_FAILED,
  HTTP_GEOSALT_SELECTED_FETCHING,  
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateGeoSaltToSuccess = (payload) => ({
  type: HTTP_GEOSALT_SUCCESS,
  payload
});

const setStateGeoSaltToFetching = () => ({
  type: HTTP_GEOSALT_FETCHING
});

const setStateGeoSaltToFailed = () => ({
  type: HTTP_GEOSALT_FAILED
});

export const setStateGeoSaltSelectedToFetching = () => ({
  type: HTTP_GEOSALT_SELECTED_FETCHING
});

export const setStateGeoSaltSelectedToSuccess = (payload) => ({
  type: HTTP_GEOSALT_SELECTED_SUCCESS,
  payload
});

const setStateGeoSaltSelectedToFailed = () => ({
  type: HTTP_GEOSALT_SELECTED_FAILED
});

export const getGeoSaltById = (id) => {
  return (dispatch) => {
    dispatch(setStateGeoSaltSelectedToFetching());
    httpClient
      .get(`${server.GEOSALT_URL}/list/${id}`)
      .then((result) => {
        dispatch(setStateGeoSaltSelectedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateGeoSaltSelectedToFailed());
      });
  };
};

export const getGeoSaltByKeyword = (searchTerm) => {
  console.log('getGeoSaltByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getGeoSaltByKeyword dispatch is called ',keyword)
    dispatch(setStateGeoSaltToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.GEOSALT_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateGeoSaltToSuccess(result.data));
          console.log('setStateGeoSaltToSuccess is called ',result.data)
        });
        } 
        else {
          doGetGeoSalts(dispatch);
        }
  };
};

export const deleteGeoSalt = (id) => {
  return async (dispatch) => {
    dispatch(setStateGeoSaltToFetching());
    await httpClient.delete(`${server.GEOSALT_URL}/${id}`);
    await doGetGeoSalts(dispatch);
  };
};

export const getGeoSalts = () => {
  return (dispatch) => {
    dispatch(setStateGeoSaltToFetching());
    doGetGeoSalts(dispatch);
  };
};

const doGetGeoSalts = (dispatch) => {
  httpClient
    .get(`${server.GEOSALT_URL}/list/all`)
    .then((result) => {
      dispatch(setStateGeoSaltToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateGeoSaltToFailed());
    });
};

