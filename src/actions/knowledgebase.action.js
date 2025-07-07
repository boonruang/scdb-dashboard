import {
  HTTP_KNOWLEDGEBASE_FAILED,
  HTTP_KNOWLEDGEBASE_FETCHING,
  HTTP_KNOWLEDGEBASE_SUCCESS,
  HTTP_KNOWLEDGEBASE_SELECTED_SUCCESS,
  HTTP_KNOWLEDGEBASE_SELECTED_FAILED,
  HTTP_KNOWLEDGEBASE_SELECTED_FETCHING,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateKnowledgebaseToSuccess = (payload) => ({
  type: HTTP_KNOWLEDGEBASE_SUCCESS,
  payload
});

const setStateKnowledgebaseToFetching = () => ({
  type: HTTP_KNOWLEDGEBASE_FETCHING
});

const setStateKnowledgebaseToFailed = () => ({
  type: HTTP_KNOWLEDGEBASE_FAILED
});


export const setStateKnowledgebaseSelectedToFetching = () => ({
  type: HTTP_KNOWLEDGEBASE_SELECTED_FETCHING
});

export const setStateKnowledgebaseSelectedToSuccess = (payload) => ({
  type: HTTP_KNOWLEDGEBASE_SELECTED_SUCCESS,
  payload
});

const setStateKnowledgebaseSelectedToFailed = () => ({
  type: HTTP_KNOWLEDGEBASE_SELECTED_FAILED
});

export const getKnowledgebaseById = (id) => {
  return (dispatch) => {
    dispatch(setStateKnowledgebaseSelectedToFetching());
    httpClient
      .get(`${server.KNOWLEDGEBASE_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateKnowledgebaseSelectedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateKnowledgebaseSelectedToFailed());
      });
  };
};


export const getKnowledgebaseByKeyword = (searchTerm) => {
  console.log('getKnowledgebaseByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getKnowledgebaseByKeyword dispatch is called ',keyword)
    dispatch(setStateKnowledgebaseToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.KNOWLEDGEBASE_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateKnowledgebaseToSuccess(result.data));
          console.log('setStateKnowledgebaseToSuccess is called ',result.data)
        });
        } 
        else {
          doGetKnowledgebase(dispatch);
        }
  };
};

export const deleteKnowledgebase = (id) => {
  return async (dispatch) => {
    dispatch(setStateKnowledgebaseToFetching());
    await httpClient.delete(`${server.KNOWLEDGEBASE_URL}/${id}`);
    await doGetKnowledgebase(dispatch);
  };
};

export const getKnowledgebase = () => {
  return (dispatch) => {
    dispatch(setStateKnowledgebaseToFetching());
    doGetKnowledgebase(dispatch);
  };
};

const doGetKnowledgebase = (dispatch) => {
  httpClient
    .get(`${server.KNOWLEDGEBASE_URL}/list`)
    .then((result) => {
      dispatch(setStateKnowledgebaseToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateKnowledgebaseToFailed());
    });
};

export const addKnowledgebase = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.KNOWLEDGEBASE_URL, formData)
      console.log('addKnowledgebase formData successfully: ', result)
      setTimeout(() => {
        navigate('/knowledgebase')
      },5000)      
    } catch (error) {
      // failed
      console.log('addKnowledgebase formData Error: ', error.toString())
    }
  }
}

export const updateKnowledgebase = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.KNOWLEDGEBASE_URL, formData)
      console.log('updated Knowledgebase formData successfully: ', result)
      setTimeout(() => {
        navigate('/knowledgebase')
      },5000)
    } catch (error) {
      // failed
      console.log('updated Knowledgebase formData Error: ', error.toString())
    }
  }
}
