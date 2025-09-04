import {
  HTTP_PROJECT_FAILED,
  HTTP_PROJECT_FETCHING,
  HTTP_PROJECT_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateProjectToSuccess = (payload) => ({
  type: HTTP_PROJECT_SUCCESS,
  payload
});

const setStateProjectToFetching = () => ({
  type: HTTP_PROJECT_FETCHING
});

const setStateProjectToFailed = () => ({
  type: HTTP_PROJECT_FAILED
});


export const getProjectById = (id) => {
  return (dispatch) => {
    dispatch(setStateProjectToFetching());
    httpClient
      .get(`${server.PROJECT_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateProjectToSuccess(result.data));
      })
      .catch((error) => {
        console.Project(error);
        dispatch(setStateProjectToFailed());
      });
  };
};


export const getProjectByKeyword = (searchTerm) => {
  console.Project('getProjectByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.Project('getProjectByKeyword dispatch is called ',keyword)
    dispatch(setStateProjectToFetching());
    if (keyword !== null && keyword !== '') {
      console.Project('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.PROJECT_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateProjectToSuccess(result.data));
          console.Project('setStateProjectToSuccess is called ',result.data)
        });
        } 
        else {
          doGetProject(dispatch);
        }
  };
};

export const deleteProject = (id) => {
  return async (dispatch) => {
    dispatch(setStateProjectToFetching());
    await httpClient.delete(`${server.PROJECT_URL}/${id}`);
    await doGetProject(dispatch);
  };
};

export const getProject = () => {
  return (dispatch) => {
    dispatch(setStateProjectToFetching());
    doGetProject(dispatch);
  };
};

const doGetProject = (dispatch) => {
  httpClient
    .get(`${server.PROJECT_URL}/list`)
    .then((result) => {
      dispatch(setStateProjectToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateProjectToFailed());
    });
};

export const addProject = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.PROJECT_URL, formData)
      console.log('addProject formData successfully: ', result)
      setTimeout(() => {
        navigate('/staff')
      },5000)
    } catch (error) {
      // failed
      console.log('addProject formData Error: ', error.toString())
    }
  }
}

export const updateProject = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.PROJECT_URL, formData)
      console.log('editProject formData successfully: ', result)
      setTimeout(() => {
        navigate('/staff')
      },5000)
    } catch (error) {
      // failed
      console.log('editProject formData Error: ', error.toString())
    }
  }
}