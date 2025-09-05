import {
  HTTP_ACADEMIC_FAILED,
  HTTP_ACADEMIC_FETCHING,
  HTTP_ACADEMIC_SUCCESS,
  HTTP_ACADEMIC_SELECTED_SUCCESS,
  HTTP_ACADEMIC_SELECTED_FAILED,
  HTTP_ACADEMIC_SELECTED_FETCHING,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateAcademicProgramToSuccess = (payload) => ({
  type: HTTP_ACADEMIC_SUCCESS,
  payload
});

const setStateAcademicProgramToFetching = () => ({
  type: HTTP_ACADEMIC_FETCHING
});

const setStateAcademicProgramToFailed = () => ({
  type: HTTP_ACADEMIC_FAILED
});


export const setStateAcademicProgramSelectedToFetching = () => ({
  type: HTTP_ACADEMIC_SELECTED_FETCHING
});

export const setStateAcademicProgramSelectedToSuccess = (payload) => ({
  type: HTTP_ACADEMIC_SELECTED_SUCCESS,
  payload
});

const setStateAcademicProgramSelectedToFailed = () => ({
  type: HTTP_ACADEMIC_SELECTED_FAILED
});

export const getAcademicProgramById = (id) => {
  return (dispatch) => {
    dispatch(setStateAcademicProgramSelectedToFetching());
    httpClient
      .get(`${server.ACADEMIC_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateAcademicProgramSelectedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateAcademicProgramSelectedToFailed());
      });
  };
};


export const getAcademicProgramByKeyword = (searchTerm) => {
  console.log('getAcademicProgramByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getAcademicProgramByKeyword dispatch is called ',keyword)
    dispatch(setStateAcademicProgramToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.ACADEMIC_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateAcademicProgramToSuccess(result.data));
          console.log('setStateAcademicProgramToSuccess is called ',result.data)
        });
        } 
        else {
          doGetAcademicProgram(dispatch);
        }
  };
};

export const deleteAcademicProgram = (id) => {
  return async (dispatch) => {
    dispatch(setStateAcademicProgramToFetching());
    await httpClient.delete(`${server.ACADEMIC_URL}/${id}`);
    await doGetAcademicProgram(dispatch);
  };
};

export const getAcademicProgram = () => {
  return (dispatch) => {
    dispatch(setStateAcademicProgramToFetching());
    doGetAcademicProgram(dispatch);
  };
};

const doGetAcademicProgram = (dispatch) => {
  httpClient
    .get(`${server.ACADEMIC_URL}/list`)
    .then((result) => {
      dispatch(setStateAcademicProgramToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateAcademicProgramToFailed());
    });
};

export const addAcademicProgram = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.ACADEMIC_URL, formData)
      console.log('addAcademicProgram formData successfully: ', result)
      setTimeout(() => {
        navigate('/academicprogram')
      },5000)      
    } catch (error) {
      // failed
      console.log('addAcademicProgram formData Error: ', error.toString())
    }
  }
}

export const updateAcademicProgram = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.ACADEMIC_URL, formData)
      console.log('updated AcademicProgram formData successfully: ', result)
      setTimeout(() => {
        navigate('/academicprogram')
      },5000)
    } catch (error) {
      // failed
      console.log('updated AcademicProgram formData Error: ', error.toString())
    }
  }
}
