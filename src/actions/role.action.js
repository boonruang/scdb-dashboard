import {
  HTTP_ROLE_FAILED,
  HTTP_ROLE_FETCHING,
  HTTP_ROLE_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateRoleToSuccess = (payload) => ({
  type: HTTP_ROLE_SUCCESS,
  payload
});

const setStateRoleToFetching = () => ({
  type: HTTP_ROLE_FETCHING
});

const setStateRoleToFailed = () => ({
  type: HTTP_ROLE_FAILED
});

export const getRoleByKeyword = (searchTerm) => {
  console.log('getRoleByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getRoleByKeyword dispatch is called ',keyword)
    dispatch(setStateRoleToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.ROLE_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateRoleToSuccess(result.data));
          console.log('setStateRoleToSuccess is called ',result.data)
        });
        } 
        else {
          doGetRoles(dispatch);
        }
  };
};

export const deleteRole = (id) => {
  return async (dispatch) => {
    dispatch(setStateRoleToFetching());
    await httpClient.delete(`${server.ROLE_URL}/${id}`);
    await doGetRoles(dispatch);
  };
};

export const getRoles = () => {
  return (dispatch) => {
    dispatch(setStateRoleToFetching());
    doGetRoles(dispatch);
  };
};

const doGetRoles = (dispatch) => {
  httpClient
    .get(`${server.ROLE_URL}/list`)
    .then((result) => {
      dispatch(setStateRoleToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateRoleToFailed());
    });
};

