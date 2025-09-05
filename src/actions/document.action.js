import {
  HTTP_DOCUMENT_FAILED,
  HTTP_DOCUMENT_FETCHING,
  HTTP_DOCUMENT_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateDocumentToSuccess = (payload) => ({
  type: HTTP_DOCUMENT_SUCCESS,
  payload
});

const setStateDocumentToFetching = () => ({
  type: HTTP_DOCUMENT_FETCHING
});

const setStateDocumentToFailed = () => ({
  type: HTTP_DOCUMENT_FAILED
});


export const getDocumentById = (id) => {
  return (dispatch) => {
    dispatch(setStateDocumentToFetching());
    httpClient
      .get(`${server.DOCUMENT_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateDocumentToSuccess(result.data));
      })
      .catch((error) => {
        console.Document(error);
        dispatch(setStateDocumentToFailed());
      });
  };
};


export const getDocumentByKeyword = (searchTerm) => {
  console.Document('getDocumentByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.Document('getDocumentByKeyword dispatch is called ',keyword)
    dispatch(setStateDocumentToFetching());
    if (keyword !== null && keyword !== '') {
      console.Document('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.DOCUMENT_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateDocumentToSuccess(result.data));
          console.Document('setStateDocumentToSuccess is called ',result.data)
        });
        } 
        else {
          doGetDocument(dispatch);
        }
  };
};

export const deleteDocument = (id) => {
  return async (dispatch) => {
    dispatch(setStateDocumentToFetching());
    await httpClient.delete(`${server.DOCUMENT_URL}/${id}`);
    await doGetDocument(dispatch);
  };
};

export const getDocument = () => {
  return (dispatch) => {
    dispatch(setStateDocumentToFetching());
    doGetDocument(dispatch);
  };
};

const doGetDocument = (dispatch) => {
  httpClient
    .get(`${server.DOCUMENT_URL}/list`)
    .then((result) => {
      dispatch(setStateDocumentToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateDocumentToFailed());
    });
};

export const addDocument = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.DOCUMENT_URL, formData)
      console.log('addDocument formData successfully: ', result)
      setTimeout(() => {
        navigate('/staff')
      },5000)
    } catch (error) {
      // failed
      console.log('addDocument formData Error: ', error.toString())
    }
  }
}

export const updateDocument = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.DOCUMENT_URL, formData)
      console.log('editDocument formData successfully: ', result)
      setTimeout(() => {
        navigate('/staff')
      },5000)
    } catch (error) {
      // failed
      console.log('editDocument formData Error: ', error.toString())
    }
  }
}