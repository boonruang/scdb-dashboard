import {
  HTTP_ENTREPRENEURHERBAL_FAILED,
  HTTP_ENTREPRENEURHERBAL_FETCHING,
  HTTP_ENTREPRENEURHERBAL_SUCCESS,
  HTTP_ENTREPRENEURHERBAL_SELECTED_SUCCESS,
  HTTP_ENTREPRENEURHERBAL_SELECTED_FAILED,
  HTTP_ENTREPRENEURHERBAL_SELECTED_FETCHING,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateEntrepreneurherbalToSuccess = (payload) => ({
  type: HTTP_ENTREPRENEURHERBAL_SUCCESS,
  payload
});

const setStateEntrepreneurherbalToFetching = () => ({
  type: HTTP_ENTREPRENEURHERBAL_FETCHING
});

const setStateEntrepreneurherbalToFailed = () => ({
  type: HTTP_ENTREPRENEURHERBAL_FAILED
});


export const setStateEntrepreneurherbalSelectedToFetching = () => ({
  type: HTTP_ENTREPRENEURHERBAL_SELECTED_FETCHING
});

export const setStateEntrepreneurherbalSelectedToSuccess = (payload) => ({
  type: HTTP_ENTREPRENEURHERBAL_SELECTED_SUCCESS,
  payload
});

const setStateEntrepreneurherbalSelectedToFailed = () => ({
  type: HTTP_ENTREPRENEURHERBAL_SELECTED_FAILED
});

export const getEntrepreneurherbalById = (id) => {
  return (dispatch) => {
    dispatch(setStateEntrepreneurherbalSelectedToFetching());
    httpClient
      .get(`${server.ENTREPRENEURHERBAL_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateEntrepreneurherbalSelectedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateEntrepreneurherbalSelectedToFailed());
      });
  };
};


export const getEntrepreneurherbalByKeyword = (searchTerm) => {
  console.log('getEntrepreneurherbalByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getEntrepreneurherbalByKeyword dispatch is called ',keyword)
    dispatch(setStateEntrepreneurherbalToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.ENTREPRENEURHERBAL_URL}/province/${keyword}`)
        .then((result) => {
          dispatch(setStateEntrepreneurherbalToSuccess(result.data));
          console.log('setStateEntrepreneurherbalToSuccess is called ',result.data)
        });
        } 
        else {
          doGetEntrepreneurherbals(dispatch);
        }
  };
};

export const deleteEntrepreneurherbal = (id) => {
  return async (dispatch) => {
    dispatch(setStateEntrepreneurherbalToFetching());
    await httpClient.delete(`${server.ENTREPRENEURHERBAL_URL}/${id}`);
    await doGetEntrepreneurherbals(dispatch);
  };
};

export const getEntrepreneurherbals = () => {
  return (dispatch) => {
    dispatch(setStateEntrepreneurherbalToFetching());
    doGetEntrepreneurherbals(dispatch);
  };
};

const doGetEntrepreneurherbals = (dispatch) => {
  httpClient
    .get(`${server.ENTREPRENEURHERBAL_URL}/list`)
    .then((result) => {
      dispatch(setStateEntrepreneurherbalToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateEntrepreneurherbalToFailed());
    });
};


export const addEntrepreneurherbals = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.ENTREPRENEURHERBAL_URL, formData)
      console.log('addEntrepreneurherbals formData successfully: ', result)
      setTimeout(() => {
        navigate('/entrepreneurherbals')
      },5000)      
    } catch (error) {
      // failed
      console.log('addEntrepreneurherbals formData Error: ', error.toString())
    }
  }
}

export const updateEntrepreneurherbals = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.ENTREPRENEURHERBAL_URL, formData)
      console.log('updated Entrepreneurherbals formData successfully: ', result)
      setTimeout(() => {
        navigate('/entrepreneurherbals')
      },5000)
    } catch (error) {
      // failed
      console.log('updated Entrepreneurherbals formData Error: ', error.toString())
    }
  }
}
