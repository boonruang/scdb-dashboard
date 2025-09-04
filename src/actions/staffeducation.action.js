import {
  HTTP_STAFFEDUCATION_FAILED,
  HTTP_STAFFEDUCATION_FETCHING,
  HTTP_STAFFEDUCATION_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateStaffeducationToSuccess = (payload) => ({
  type: HTTP_STAFFEDUCATION_SUCCESS,
  payload
});

const setStateStaffeducationToFetching = () => ({
  type: HTTP_STAFFEDUCATION_FETCHING
});

const setStateStaffeducationToFailed = () => ({
  type: HTTP_STAFFEDUCATION_FAILED
});


export const getStaffeducationById = (id) => {
  return (dispatch) => {
    dispatch(setStateStaffeducationToFetching());
    httpClient
      .get(`${server.STAFFEDUCATION_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateStaffeducationToSuccess(result.data));
      })
      .catch((error) => {
        console.Staffeducation(error);
        dispatch(setStateStaffeducationToFailed());
      });
  };
};


export const getStaffeducationByKeyword = (searchTerm) => {
  console.Staffeducation('getStaffeducationByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.Staffeducation('getStaffeducationByKeyword dispatch is called ',keyword)
    dispatch(setStateStaffeducationToFetching());
    if (keyword !== null && keyword !== '') {
      console.Staffeducation('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.STAFFEDUCATION_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateStaffeducationToSuccess(result.data));
          console.Staffeducation('setStateStaffeducationToSuccess is called ',result.data)
        });
        } 
        else {
          doGetStaffeducation(dispatch);
        }
  };
};

export const deleteStaffeducation = (id) => {
  return async (dispatch) => {
    dispatch(setStateStaffeducationToFetching());
    await httpClient.delete(`${server.STAFFEDUCATION_URL}/${id}`);
    await doGetStaffeducation(dispatch);
  };
};

export const getStaffeducation = () => {
  return (dispatch) => {
    dispatch(setStateStaffeducationToFetching());
    doGetStaffeducation(dispatch);
  };
};

const doGetStaffeducation = (dispatch) => {
  httpClient
    .get(`${server.STAFFEDUCATION_URL}/list`)
    .then((result) => {
      dispatch(setStateStaffeducationToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateStaffeducationToFailed());
    });
};

export const addStaffeducation = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.STAFFEDUCATION_URL, formData)
      console.log('addStaffeducation formData successfully: ', result)
      setTimeout(() => {
        navigate('/staffeducation')
      },5000)
    } catch (error) {
      // failed
      console.log('addStaffeducation formData Error: ', error.toString())
    }
  }
}

export const updateStaffeducation = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.STAFFEDUCATION_URL, formData)
      console.log('editStaffeducation formData successfully: ', result)
      setTimeout(() => {
        navigate('/staffeducation')
      },5000)
    } catch (error) {
      // failed
      console.log('editStaffeducation formData Error: ', error.toString())
    }
  }
}