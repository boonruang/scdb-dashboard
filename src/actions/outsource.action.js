import {
  HTTP_OUTSOURCE_FAILED,
  HTTP_OUTSOURCE_FETCHING,
  HTTP_OUTSOURCE_SUCCESS,
  HTTP_OUTSOURCE_SELECTED_SUCCESS,
  HTTP_OUTSOURCE_SELECTED_FAILED,
  HTTP_OUTSOURCE_SELECTED_FETCHING,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateOutsourceToSuccess = (payload) => ({
  type: HTTP_OUTSOURCE_SUCCESS,
  payload
});

const setStateOutsourceToFetching = () => ({
  type: HTTP_OUTSOURCE_FETCHING
});

const setStateOutsourceToFailed = () => ({
  type: HTTP_OUTSOURCE_FAILED
});


export const setStateOutsourceSelectedToFetching = () => ({
  type: HTTP_OUTSOURCE_SELECTED_FETCHING
});

export const setStateOutsourceSelectedToSuccess = (payload) => ({
  type: HTTP_OUTSOURCE_SELECTED_SUCCESS,
  payload
});

const setStateOutsourceSelectedToFailed = () => ({
  type: HTTP_OUTSOURCE_SELECTED_FAILED
});

export const getOutsourceById = (id) => {
  return (dispatch) => {
    dispatch(setStateOutsourceSelectedToFetching());
    httpClient
      .get(`${server.OUTSOURCE_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateOutsourceSelectedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateOutsourceSelectedToFailed());
      });
  };
};


export const deleteOutsource = (id) => {
  return async (dispatch) => {
    dispatch(setStateOutsourceToFetching());
    await httpClient.delete(`${server.OUTSOURCE_URL}/${id}`);
    await doGetOutsources(dispatch);
  };
};

const doGetOutsources = (dispatch) => {
  httpClient
    .get(`${server.OUTSOURCE_URL}/list`)
    .then((result) => {
      dispatch(setStateOutsourceToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateOutsourceToFailed());
    });
};

export const getOutsources = () => {
  return (dispatch) => {
    dispatch(setStateOutsourceToFetching());
    setGetOutsources(dispatch);
  };
};

const setGetOutsources = (dispatch) => {
  httpClient
    .get(`${server.OUTSOURCE_URL}/list`)
    .then((result) => {
      dispatch(setStateOutsourceToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateOutsourceToFailed());
    });
};

export const addOutsource = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.OUTSOURCE_URL, formData)
      console.log('addOutsource formData successfully: ', result)
      setTimeout(() => {
        navigate('/outsources')
      },5000)      
    } catch (error) {
      // failed
      console.log('addOutsource formData Error: ', error.toString())
    }
  }
}

export const updateOutsource = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.OUTSOURCE_URL, formData)
      console.log('updated Outsource formData successfully: ', result)
      setTimeout(() => {
        navigate('/outsources')
      },5000)
    } catch (error) {
      // failed
      console.log('updated Outsource formData Error: ', error.toString())
    }
  }
}

