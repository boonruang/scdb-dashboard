import {
  HTTP_ENTREPRENEURMEDICAL_FAILED,
  HTTP_ENTREPRENEURMEDICAL_FETCHING,
  HTTP_ENTREPRENEURMEDICAL_SUCCESS,
  HTTP_ENTREPRENEURMEDICAL_SELECTED_SUCCESS,
  HTTP_ENTREPRENEURMEDICAL_SELECTED_FAILED,
  HTTP_ENTREPRENEURMEDICAL_SELECTED_FETCHING,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateEntrepreneurmedicalToSuccess = (payload) => ({
  type: HTTP_ENTREPRENEURMEDICAL_SUCCESS,
  payload
});

const setStateEntrepreneurmedicalToFetching = () => ({
  type: HTTP_ENTREPRENEURMEDICAL_FETCHING
});

const setStateEntrepreneurmedicalToFailed = () => ({
  type: HTTP_ENTREPRENEURMEDICAL_FAILED
});


export const setStateEntrepreneurmedicalSelectedToFetching = () => ({
  type: HTTP_ENTREPRENEURMEDICAL_SELECTED_FETCHING
});

export const setStateEntrepreneurmedicalSelectedToSuccess = (payload) => ({
  type: HTTP_ENTREPRENEURMEDICAL_SELECTED_SUCCESS,
  payload
});

const setStateEntrepreneurmedicalSelectedToFailed = () => ({
  type: HTTP_ENTREPRENEURMEDICAL_SELECTED_FAILED
});

export const getEntrepreneurmedicalById = (id) => {
  return (dispatch) => {
    dispatch(setStateEntrepreneurmedicalSelectedToFetching());
    httpClient
      .get(`${server.ENTREPRENEURMEDICAL_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateEntrepreneurmedicalSelectedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateEntrepreneurmedicalSelectedToFailed());
      });
  };
};


export const getEntrepreneurmedicalByKeyword = (searchTerm) => {
  console.log('getEntrepreneurmedicalByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getEntrepreneurmedicalByKeyword dispatch is called ',keyword)
    dispatch(setStateEntrepreneurmedicalToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.ENTREPRENEURMEDICAL_URL}/province/${keyword}`)
        .then((result) => {
          dispatch(setStateEntrepreneurmedicalToSuccess(result.data));
          console.log('setStateEntrepreneurmedicalToSuccess is called ',result.data)
        });
        } 
        else {
          doGetEntrepreneurmedicals(dispatch);
        }
  };
};

export const deleteEntrepreneurmedical = (id) => {
  return async (dispatch) => {
    dispatch(setStateEntrepreneurmedicalToFetching());
    await httpClient.delete(`${server.ENTREPRENEURMEDICAL_URL}/${id}`);
    await doGetEntrepreneurmedicals(dispatch);
  };
};

export const getEntrepreneurmedicals = () => {
  return (dispatch) => {
    dispatch(setStateEntrepreneurmedicalToFetching());
    doGetEntrepreneurmedicals(dispatch);
  };
};

const doGetEntrepreneurmedicals = (dispatch) => {
  httpClient
    .get(`${server.ENTREPRENEURMEDICAL_URL}/list`)
    .then((result) => {
      dispatch(setStateEntrepreneurmedicalToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateEntrepreneurmedicalToFailed());
    });
};

export const addEntrepreneurmedicals = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.ENTREPRENEURMEDICAL_URL, formData)
      console.log('addEntrepreneurmedicals formData successfully: ', result)
      setTimeout(() => {
        navigate('/entrepreneurmedical')
      },5000)      
    } catch (error) {
      // failed
      console.log('addEntrepreneurmedicals formData Error: ', error.toString())
    }
  }
}

export const updateEntrepreneurmedicals = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.ENTREPRENEURMEDICAL_URL, formData)
      console.log('updated Entrepreneurmedicals formData successfully: ', result)
      setTimeout(() => {
        navigate('/entrepreneurmedical')
      },5000)
    } catch (error) {
      // failed
      console.log('updated Entrepreneurmedicals formData Error: ', error.toString())
    }
  }
}
