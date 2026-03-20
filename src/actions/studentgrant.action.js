import {
  HTTP_STUDENTGRANT_FAILED,
  HTTP_STUDENTGRANT_FETCHING,
  HTTP_STUDENTGRANT_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateStudentgrantToSuccess = (payload) => ({
  type: HTTP_STUDENTGRANT_SUCCESS,
  payload
});

const setStateStudentgrantToFetching = () => ({
  type: HTTP_STUDENTGRANT_FETCHING
});

const setStateStudentgrantToFailed = () => ({
  type: HTTP_STUDENTGRANT_FAILED
});

const doGetStudentgrant = (dispatch) => {
  httpClient
    .get(`${server.STUDENTGRANT_URL}/list`)
    .then((result) => {
      dispatch(setStateStudentgrantToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateStudentgrantToFailed());
    });
};

export const getStudentgrantById = (id) => {
  return (dispatch) => {
    dispatch(setStateStudentgrantToFetching());
    httpClient
      .get(`${server.STUDENTGRANT_URL}/${id}`)
      .then((result) => {
        dispatch(setStateStudentgrantToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateStudentgrantToFailed());
      });
  };
};

export const deleteStudentgrant = (id) => {
  return async (dispatch) => {
    dispatch(setStateStudentgrantToFetching());
    await httpClient.delete(`${server.STUDENTGRANT_URL}/${id}`);
    await doGetStudentgrant(dispatch);
  };
};

export const getStudentgrant = () => {
  return (dispatch) => {
    dispatch(setStateStudentgrantToFetching());
    doGetStudentgrant(dispatch);
  };
};

export const addStudentgrant = (navigate, formData) => {
  return async (dispatch) => {
    try {
      let result = await httpClient.post(server.STUDENTGRANT_URL, formData)
      console.log('addStudentgrant formData successfully: ', result)
      return { success: true, data: result.data }
    } catch (error) {
      console.log('addStudentgrant formData Error: ', error.toString())
      return { success: false, error: error.message || error.toString() }
    }
  }
}

export const updateStudentgrant = (navigate, formData, id) => {
  return async (dispatch) => {
    try {
      let result = await httpClient.put(`${server.STUDENTGRANT_URL}/${id}`, formData)
      console.log('updateStudentgrant formData successfully: ', result)
      return { success: true, data: result.data }
    } catch (error) {
      console.log('updateStudentgrant formData Error: ', error.toString())
      return { success: false, error: error.message || error.toString() }
    }
  }
}
