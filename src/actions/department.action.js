import {
  HTTP_DEPARTMENT_FAILED,
  HTTP_DEPARTMENT_FETCHING,
  HTTP_DEPARTMENT_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateDepartmentToSuccess = (payload) => ({
  type: HTTP_DEPARTMENT_SUCCESS,
  payload
});

const setStateDepartmentToFetching = () => ({
  type: HTTP_DEPARTMENT_FETCHING
});

const setStateDepartmentToFailed = () => ({
  type: HTTP_DEPARTMENT_FAILED
});


export const getDepartmentById = (id) => {
  return (dispatch) => {
    dispatch(setStateDepartmentToFetching());
    httpClient
      .get(`${server.DEPARTMENT_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateDepartmentToSuccess(result.data));
      })
      .catch((error) => {
        console.Department(error);
        dispatch(setStateDepartmentToFailed());
      });
  };
};


export const getDepartmentByKeyword = (searchTerm) => {
  console.Department('getDepartmentByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.Department('getDepartmentByKeyword dispatch is called ',keyword)
    dispatch(setStateDepartmentToFetching());
    if (keyword !== null && keyword !== '') {
      console.Department('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.DEPARTMENT_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateDepartmentToSuccess(result.data));
          console.Department('setStateDepartmentToSuccess is called ',result.data)
        });
        } 
        else {
          doGetDepartment(dispatch);
        }
  };
};

export const deleteDepartment = (id) => {
  return async (dispatch) => {
    dispatch(setStateDepartmentToFetching());
    await httpClient.delete(`${server.DEPARTMENT_URL}/${id}`);
    await doGetDepartment(dispatch);
  };
};

export const getDepartment = () => {
  return (dispatch) => {
    dispatch(setStateDepartmentToFetching());
    doGetDepartment(dispatch);
  };
};

const doGetDepartment = (dispatch) => {
  httpClient
    .get(`${server.DEPARTMENT_URL}/list`)
    .then((result) => {
      dispatch(setStateDepartmentToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateDepartmentToFailed());
    });
};

export const addDepartment = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.DEPARTMENT_URL, formData)
      console.log('addDepartment formData successfully: ', result)
      setTimeout(() => {
        navigate('/department')
      },5000)
    } catch (error) {
      // failed
      console.log('addDepartment formData Error: ', error.toString())
    }
  }
}

export const updateDepartment = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.DEPARTMENT_URL, formData)
      console.log('editDepartment formData successfully: ', result)
      setTimeout(() => {
        navigate('/department')
      },5000)
    } catch (error) {
      // failed
      console.log('editDepartment formData Error: ', error.toString())
    }
  }
}