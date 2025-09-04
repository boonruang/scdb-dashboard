import {
  HTTP_PUBLICATION_FAILED,
  HTTP_PUBLICATION_FETCHING,
  HTTP_PUBLICATION_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStatePublicationToSuccess = (payload) => ({
  type: HTTP_PUBLICATION_SUCCESS,
  payload
});

const setStatePublicationToFetching = () => ({
  type: HTTP_PUBLICATION_FETCHING
});

const setStatePublicationToFailed = () => ({
  type: HTTP_PUBLICATION_FAILED
});


export const getPublicationById = (id) => {
  return (dispatch) => {
    dispatch(setStatePublicationToFetching());
    httpClient
      .get(`${server.PUBLICATION_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStatePublicationToSuccess(result.data));
      })
      .catch((error) => {
        console.Publication(error);
        dispatch(setStatePublicationToFailed());
      });
  };
};


export const getPublicationByKeyword = (searchTerm) => {
  console.Publication('getPublicationByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.Publication('getPublicationByKeyword dispatch is called ',keyword)
    dispatch(setStatePublicationToFetching());
    if (keyword !== null && keyword !== '') {
      console.Publication('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.PUBLICATION_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStatePublicationToSuccess(result.data));
          console.Publication('setStatePublicationToSuccess is called ',result.data)
        });
        } 
        else {
          doGetPublication(dispatch);
        }
  };
};

export const deletePublication = (id) => {
  return async (dispatch) => {
    dispatch(setStatePublicationToFetching());
    await httpClient.delete(`${server.PUBLICATION_URL}/${id}`);
    await doGetPublication(dispatch);
  };
};

export const getPublication = () => {
  return (dispatch) => {
    dispatch(setStatePublicationToFetching());
    doGetPublication(dispatch);
  };
};

const doGetPublication = (dispatch) => {
  httpClient
    .get(`${server.PUBLICATION_URL}/list`)
    .then((result) => {
      dispatch(setStatePublicationToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStatePublicationToFailed());
    });
};

export const addPublication = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.PUBLICATION_URL, formData)
      console.log('addPublication formData successfully: ', result)
      setTimeout(() => {
        navigate('/staff')
      },5000)
    } catch (error) {
      // failed
      console.log('addPublication formData Error: ', error.toString())
    }
  }
}

export const updatePublication = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.PUBLICATION_URL, formData)
      console.log('editPublication formData successfully: ', result)
      setTimeout(() => {
        navigate('/staff')
      },5000)
    } catch (error) {
      // failed
      console.log('editPublication formData Error: ', error.toString())
    }
  }
}