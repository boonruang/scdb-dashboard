import {
  HTTP_FARMERGROUP_MAP_SUCCESS,
  HTTP_FARMERGROUP_MAP_FAILED,
  HTTP_FARMERGROUP_MAP_FETCHING,
  HTTP_FARMERGROUP_SELECTED_SUCCESS,
  HTTP_FARMERGROUP_SELECTED_FAILED,
  HTTP_FARMERGROUP_SELECTED_FETCHING,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateFarmergroupToSuccess = (payload) => ({
  type: HTTP_FARMERGROUP_MAP_SUCCESS,
  payload
});

const setStateFarmergroupToFetching = () => ({
  type: HTTP_FARMERGROUP_MAP_FETCHING
});

const setStateFarmergroupToFailed = () => ({
  type: HTTP_FARMERGROUP_MAP_FAILED
});

export const setStateFarmergroupSelectedToFetching = () => ({
  type: HTTP_FARMERGROUP_SELECTED_FETCHING
});

export const setStateFarmergroupSelectedToSuccess = (payload) => ({
  type: HTTP_FARMERGROUP_SELECTED_SUCCESS,
  payload
});

const setStateFarmergroupSelectedToFailed = () => ({
  type: HTTP_FARMERGROUP_SELECTED_FAILED
});

export const getFarmergroupById = (id) => {
  return (dispatch) => {
    dispatch(setStateFarmergroupSelectedToFetching());
    httpClient
      .get(`${server.FARMERGROUP_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateFarmergroupSelectedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateFarmergroupSelectedToFailed());
      });
  };
};

export const getFarmergroupByKeyword = (searchTerm) => {
  console.log('getFarmergroupByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getFarmergroupByKeyword dispatch is called ',keyword)
    dispatch(setStateFarmergroupToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.FARMERGROUP_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateFarmergroupToSuccess(result.data));
          console.log('setStateFarmergroupToSuccess is called ',result.data)
        });
        } 
        else {
          doGetFarmergroups(dispatch);
        }
  };
};

const doGetFarmergroups = (dispatch) => {
  httpClient
    .get(`${server.FARMERGROUP_URL}/list/all`)
    .then((result) => {
      dispatch(setStateFarmergroupToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateFarmergroupToFailed());
    });
};

