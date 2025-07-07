import {
  HTTP_USER_FAILED,
  HTTP_USER_FETCHING,
  HTTP_USER_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateUserToSuccess = (payload) => ({
  type: HTTP_USER_SUCCESS,
  payload
});

const setStateUserToFetching = () => ({
  type: HTTP_USER_FETCHING
});

const setStateUserToFailed = () => ({
  type: HTTP_USER_FAILED
});

export const getUserByKeyword = (searchTerm) => {
  console.log('getUserByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getUserByKeyword dispatch is called ',keyword)
    dispatch(setStateUserToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.USER_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateUserToSuccess(result.data));
          console.log('setStateUserToSuccess is called ',result.data)
        });
        } 
        else {
          doGetUsers(dispatch);
        }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    dispatch(setStateUserToFetching());
    await httpClient.delete(`${server.USER_URL}/${id}`);
    await doGetUsers(dispatch);
  };
};

export const getUsers = () => {
  return (dispatch) => {
    dispatch(setStateUserToFetching());
    doGetUsers(dispatch);
  };
};

const doGetUsers = (dispatch) => {
  httpClient
    .get(`${server.USER_URL}/list`)
    .then((result) => {
      dispatch(setStateUserToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateUserToFailed());
    });
};

export const addUser = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.USER_URL, formData)
      console.log('addUser formData successfully: ', result)
      setTimeout(() => {
        navigate('/users/list')
      },5000)
    } catch (error) {
      // failed
      console.log('addUser formData Error: ', error.toString())
    }
  }
}

export const updateUser = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.USER_URL, formData)
      console.log('editUser formData successfully: ', result)
      setTimeout(() => {
        navigate('/users/list')
      },5000)
    } catch (error) {
      // failed
      console.log('editUser formData Error: ', error.toString())
    }
  }
}
