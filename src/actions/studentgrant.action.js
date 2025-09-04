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


export const getStudentgrantById = (id) => {
  return (dispatch) => {
    dispatch(setStateStudentgrantToFetching());
    httpClient
      .get(`${server.STUDENT_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateStudentgrantToSuccess(result.data));
      })
      .catch((error) => {
        console.Studentgrant(error);
        dispatch(setStateStudentgrantToFailed());
      });
  };
};


export const getStudentgrantByKeyword = (searchTerm) => {
  console.Studentgrant('getStudentgrantByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.Studentgrant('getStudentgrantByKeyword dispatch is called ',keyword)
    dispatch(setStateStudentgrantToFetching());
    if (keyword !== null && keyword !== '') {
      console.Studentgrant('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.STUDENTGRANT_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateStudentgrantToSuccess(result.data));
          console.Studentgrant('setStateStudentgrantToSuccess is called ',result.data)
        });
        } 
        else {
          doGetStudentgrant(dispatch);
        }
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

export const addStudentgrant = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.STUDENTGRANT_URL, formData)
      console.log('addStudentgrant formData successfully: ', result)
      setTimeout(() => {
        navigate('/student')
      },5000)
    } catch (error) {
      // failed
      console.log('addStudentgrant formData Error: ', error.toString())
    }
  }
}

export const updateStudentgrant = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.STUDENTGRANT_URL, formData)
      console.log('editStudentgrant formData successfully: ', result)
      setTimeout(() => {
        navigate('/student')
      },5000)
    } catch (error) {
      // failed
      console.log('editStudentgrant formData Error: ', error.toString())
    }
  }
}