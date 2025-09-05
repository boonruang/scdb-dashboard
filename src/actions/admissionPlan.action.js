import {
  HTTP_ADMISSIONPLAN_FAILED,
  HTTP_ADMISSIONPLAN_FETCHING,
  HTTP_ADMISSIONPLAN_SUCCESS,
  HTTP_ADMISSIONPLAN_SELECTED_SUCCESS,
  HTTP_ADMISSIONPLAN_SELECTED_FAILED,
  HTTP_ADMISSIONPLAN_SELECTED_FETCHING,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateAdmissionPlanToSuccess = (payload) => ({
  type: HTTP_ADMISSIONPLAN_SUCCESS,
  payload
});

const setStateAdmissionPlanToFetching = () => ({
  type: HTTP_ADMISSIONPLAN_FETCHING
});

const setStateAdmissionPlanToFailed = () => ({
  type: HTTP_ADMISSIONPLAN_FAILED
});


export const setStateAdmissionPlanSelectedToFetching = () => ({
  type: HTTP_ADMISSIONPLAN_SELECTED_FETCHING
});

export const setStateAdmissionPlanSelectedToSuccess = (payload) => ({
  type: HTTP_ADMISSIONPLAN_SELECTED_SUCCESS,
  payload
});

const setStateAdmissionPlanSelectedToFailed = () => ({
  type: HTTP_ADMISSIONPLAN_SELECTED_FAILED
});

export const getAdmissionPlanById = (id) => {
  return (dispatch) => {
    dispatch(setStateAdmissionPlanSelectedToFetching());
    httpClient
      .get(`${server.ADMISSIONPLAN_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateAdmissionPlanSelectedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateAdmissionPlanSelectedToFailed());
      });
  };
};


export const getAdmissionPlanByKeyword = (searchTerm) => {
  console.log('getAdmissionPlanByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getAdmissionPlanByKeyword dispatch is called ',keyword)
    dispatch(setStateAdmissionPlanToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.ADMISSIONPLAN_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateAdmissionPlanToSuccess(result.data));
          console.log('setStateAdmissionPlanToSuccess is called ',result.data)
        });
        } 
        else {
          doGetAdmissionPlan(dispatch);
        }
  };
};

export const deleteAdmissionPlan = (id) => {
  return async (dispatch) => {
    dispatch(setStateAdmissionPlanToFetching());
    await httpClient.delete(`${server.ADMISSIONPLAN_URL}/${id}`);
    await doGetAdmissionPlan(dispatch);
  };
};

export const getAdmissionPlan = () => {
  return (dispatch) => {
    dispatch(setStateAdmissionPlanToFetching());
    doGetAdmissionPlan(dispatch);
  };
};

const doGetAdmissionPlan = (dispatch) => {
  httpClient
    .get(`${server.ADMISSIONPLAN_URL}/list`)
    .then((result) => {
      dispatch(setStateAdmissionPlanToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateAdmissionPlanToFailed());
    });
};

export const addAdmissionPlan = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.ADMISSIONPLAN_URL, formData)
      console.log('addAdmissionPlan formData successfully: ', result)
      setTimeout(() => {
        navigate('/admissionplan')
      },5000)      
    } catch (error) {
      // failed
      console.log('addAdmissionPlan formData Error: ', error.toString())
    }
  }
}

export const updateAdmissionPlan = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.ADMISSIONPLAN_URL, formData)
      console.log('updated AdmissionPlan formData successfully: ', result)
      setTimeout(() => {
        navigate('/admissionplan')
      },5000)
    } catch (error) {
      // failed
      console.log('updated AdmissionPlan formData Error: ', error.toString())
    }
  }
}
