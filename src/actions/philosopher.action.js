import {
  HTTP_PHILOSOPHER_FAILED,
  HTTP_PHILOSOPHER_FETCHING,
  HTTP_PHILOSOPHER_SUCCESS,
  HTTP_PHILOSOPHER_SELECTED_SUCCESS,
  HTTP_PHILOSOPHER_SELECTED_FAILED,
  HTTP_PHILOSOPHER_SELECTED_FETCHING,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStatePhilosopherToSuccess = (payload) => ({
  type: HTTP_PHILOSOPHER_SUCCESS,
  payload
});

const setStatePhilosopherToFetching = () => ({
  type: HTTP_PHILOSOPHER_FETCHING
});

const setStatePhilosopherToFailed = () => ({
  type: HTTP_PHILOSOPHER_FAILED
});


export const setStatePhilosopherSelectedToFetching = () => ({
  type: HTTP_PHILOSOPHER_SELECTED_FETCHING
});

export const setStatePhilosopherSelectedToSuccess = (payload) => ({
  type: HTTP_PHILOSOPHER_SELECTED_SUCCESS,
  payload
});

const setStatePhilosopherSelectedToFailed = () => ({
  type: HTTP_PHILOSOPHER_SELECTED_FAILED
});

export const getPhilosopherById = (id) => {
  return (dispatch) => {
    dispatch(setStatePhilosopherSelectedToFetching());
    httpClient
      .get(`${server.PHILOSOPHER_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStatePhilosopherSelectedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStatePhilosopherSelectedToFailed());
      });
  };
};


export const getPhilosopherByKeyword = (searchTerm) => {
  console.log('getPhilosopherByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getPhilosopherByKeyword dispatch is called ',keyword)
    dispatch(setStatePhilosopherToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.PHILOSOPHER_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStatePhilosopherToSuccess(result.data));
          console.log('setStatePhilosopherToSuccess is called ',result.data)
        });
        } 
        else {
          doGetPhilosophers(dispatch);
        }
  };
};

export const deletePhilosopher = (id) => {
  return async (dispatch) => {
    dispatch(setStatePhilosopherToFetching());
    await httpClient.delete(`${server.PHILOSOPHER_URL}/${id}`);
    await doGetPhilosophers(dispatch);
  };
};

export const getPhilosophers = () => {
  return (dispatch) => {
    dispatch(setStatePhilosopherToFetching());
    doGetPhilosophers(dispatch);
  };
};

const doGetPhilosophers = (dispatch) => {
  httpClient
    .get(`${server.PHILOSOPHER_URL}/list`)
    .then((result) => {
      dispatch(setStatePhilosopherToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStatePhilosopherToFailed());
    });
};

export const addPhilosopher = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.PHILOSOPHER_URL, formData)
      console.log('addPhilosopher formData successfully: ', result)
      setTimeout(() => {
        navigate('/philosophers')
      },5000)      
    } catch (error) {
      // failed
      console.log('addPhilosopher formData Error: ', error.toString())
    }
  }
}

export const updatePhilosopher = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.PHILOSOPHER_URL, formData)
      console.log('updated Philosopher formData successfully: ', result)
      setTimeout(() => {
        navigate('/philosophers')
      },5000)
    } catch (error) {
      // failed
      console.log('updated Philosopher formData Error: ', error.toString())
    }
  }
}

