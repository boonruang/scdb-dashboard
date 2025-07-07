import {
  HTTP_RESEARCHINNOVATION_FAILED,
  HTTP_RESEARCHINNOVATION_FETCHING,
  HTTP_RESEARCHINNOVATION_SUCCESS,
  HTTP_RESEARCHINNOVATION_SELECTED_SUCCESS,
  HTTP_RESEARCHINNOVATION_SELECTED_FAILED,
  HTTP_RESEARCHINNOVATION_SELECTED_FETCHING,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateResearchinnovationToSuccess = (payload) => ({
  type: HTTP_RESEARCHINNOVATION_SUCCESS,
  payload
});

const setStateResearchinnovationToFetching = () => ({
  type: HTTP_RESEARCHINNOVATION_FETCHING
});

const setStateResearchinnovationToFailed = () => ({
  type: HTTP_RESEARCHINNOVATION_FAILED
});


export const setStateResearchinnovationSelectedToFetching = () => ({
  type: HTTP_RESEARCHINNOVATION_SELECTED_FETCHING
});

export const setStateResearchinnovationSelectedToSuccess = (payload) => ({
  type: HTTP_RESEARCHINNOVATION_SELECTED_SUCCESS,
  payload
});

const setStateResearchinnovationSelectedToFailed = () => ({
  type: HTTP_RESEARCHINNOVATION_SELECTED_FAILED
});

export const getResearchinnovationById = (id) => {
  return (dispatch) => {
    dispatch(setStateResearchinnovationSelectedToFetching());
    httpClient
      .get(`${server.RESEARCHINNOVATION_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateResearchinnovationSelectedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateResearchinnovationSelectedToFailed());
      });
  };
};


export const getResearchinnovationByKeyword = (searchTerm) => {
  console.log('getResearchinnovationByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getResearchinnovationByKeyword dispatch is called ',keyword)
    dispatch(setStateResearchinnovationToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.RESEARCHINNOVATION_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateResearchinnovationToSuccess(result.data));
          console.log('setStateResearchinnovationToSuccess is called ',result.data)
        });
        } 
        else {
          doGetResearchinnovations(dispatch);
        }
  };
};

export const deleteResearchinnovation = (id) => {
  return async (dispatch) => {
    dispatch(setStateResearchinnovationToFetching());
    await httpClient.delete(`${server.RESEARCHINNOVATION_URL}/${id}`);
    await doGetResearchinnovations(dispatch);
  };
};

export const getResearchinnovations = () => {
  return (dispatch) => {
    dispatch(setStateResearchinnovationToFetching());
    doGetResearchinnovations(dispatch);
  };
};

const doGetResearchinnovations = (dispatch) => {
  httpClient
    .get(`${server.RESEARCHINNOVATION_URL}/list`)
    .then((result) => {
      dispatch(setStateResearchinnovationToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateResearchinnovationToFailed());
    });
};

export const addResearchinnovation = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.RESEARCHINNOVATION_URL, formData)
      console.log('addResearchinnovation formData successfully: ', result)
      setTimeout(() => {
        navigate('/researchinnovations')
      },5000)      
    } catch (error) {
      // failed
      console.log('addResearchinnovation formData Error: ', error.toString())
    }
  }
}

export const updateResearchinnovation = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.RESEARCHINNOVATION_URL, formData)
      console.log('updated Researchinnovation formData successfully: ', result)
      setTimeout(() => {
        navigate('/researchinnovations')
      },5000)
    } catch (error) {
      // failed
      console.log('updated Researchinnovation formData Error: ', error.toString())
    }
  }
}

