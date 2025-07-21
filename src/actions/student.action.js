import {
  HTTP_STUDENT_FAILED,
  HTTP_STUDENT_FETCHING,
  HTTP_STUDENT_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateStudentToSuccess = (payload) => ({
  type: HTTP_STUDENT_SUCCESS,
  payload
});

const setStateStudentToFetching = () => ({
  type: HTTP_STUDENT_FETCHING
});

const setStateStudentToFailed = () => ({
  type: HTTP_STUDENT_FAILED
});


export const getStudentById = (id) => {
  return (dispatch) => {
    dispatch(setStateStudentToFetching());
    httpClient
      .get(`${server.STUDENT_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateStudentToSuccess(result.data));
      })
      .catch((error) => {
        console.Student(error);
        dispatch(setStateStudentToFailed());
      });
  };
};


export const getStudentByKeyword = (searchTerm) => {
  console.Student('getStudentByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.Student('getStudentByKeyword dispatch is called ',keyword)
    dispatch(setStateStudentToFetching());
    if (keyword !== null && keyword !== '') {
      console.Student('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.STUDENT_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateStudentToSuccess(result.data));
          console.Student('setStateStudentToSuccess is called ',result.data)
        });
        } 
        else {
          doGetStudent(dispatch);
        }
  };
};

export const deleteStudent = (id) => {
  return async (dispatch) => {
    dispatch(setStateStudentToFetching());
    await httpClient.delete(`${server.STUDENT_URL}/${id}`);
    await doGetStudent(dispatch);
  };
};

export const getStudent = () => {
  return (dispatch) => {
    dispatch(setStateStudentToFetching());
    doGetStudent(dispatch);
  };
};

const doGetStudent = (dispatch) => {
  httpClient
    .get(`${server.STUDENT_URL}/list`)
    .then((result) => {
      dispatch(setStateStudentToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateStudentToFailed());
    });
};

export const addStudent = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.STUDENT_URL, formData)
      console.log('addStudent formData successfully: ', result)
      setTimeout(() => {
        navigate('/student')
      },5000)
    } catch (error) {
      // failed
      console.log('addStudent formData Error: ', error.toString())
    }
  }
}

export const updateStudent = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.STUDENT_URL, formData)
      console.log('editStudent formData successfully: ', result)
      setTimeout(() => {
        navigate('/student')
      },5000)
    } catch (error) {
      // failed
      console.log('editStudent formData Error: ', error.toString())
    }
  }
}