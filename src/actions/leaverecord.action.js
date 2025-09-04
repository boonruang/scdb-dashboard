import {
  HTTP_LEAVERECORD_FAILED,
  HTTP_LEAVERECORD_FETCHING,
  HTTP_LEAVERECORD_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateLeaverecordToSuccess = (payload) => ({
  type: HTTP_LEAVERECORD_SUCCESS,
  payload
});

const setStateLeaverecordToFetching = () => ({
  type: HTTP_LEAVERECORD_FETCHING
});

const setStateLeaverecordToFailed = () => ({
  type: HTTP_LEAVERECORD_FAILED
});


export const getLeaverecordById = (id) => {
  return (dispatch) => {
    dispatch(setStateLeaverecordToFetching());
    httpClient
      .get(`${server.LEAVERECORD_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateLeaverecordToSuccess(result.data));
      })
      .catch((error) => {
        console.Leaverecord(error);
        dispatch(setStateLeaverecordToFailed());
      });
  };
};


export const getLeaverecordByKeyword = (searchTerm) => {
  console.Leaverecord('getLeaverecordByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.Leaverecord('getLeaverecordByKeyword dispatch is called ',keyword)
    dispatch(setStateLeaverecordToFetching());
    if (keyword !== null && keyword !== '') {
      console.Leaverecord('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.LEAVERECORD_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateLeaverecordToSuccess(result.data));
          console.Leaverecord('setStateLeaverecordToSuccess is called ',result.data)
        });
        } 
        else {
          doGetLeaverecord(dispatch);
        }
  };
};

export const deleteLeaverecord = (id) => {
  return async (dispatch) => {
    dispatch(setStateLeaverecordToFetching());
    await httpClient.delete(`${server.LEAVERECORD_URL}/${id}`);
    await doGetLeaverecord(dispatch);
  };
};

export const getLeaverecord = () => {
  return (dispatch) => {
    dispatch(setStateLeaverecordToFetching());
    doGetLeaverecord(dispatch);
  };
};

const doGetLeaverecord = (dispatch) => {
  httpClient
    .get(`${server.LEAVERECORD_URL}/list`)
    .then((result) => {
      dispatch(setStateLeaverecordToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateLeaverecordToFailed());
    });
};

export const addLeaverecord = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.LEAVERECORD_URL, formData)
      console.log('addLeaverecord formData successfully: ', result)
      setTimeout(() => {
        navigate('/leaverecord')
      },5000)
    } catch (error) {
      // failed
      console.log('addLeaverecord formData Error: ', error.toString())
    }
  }
}

export const updateLeaverecord = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.LEAVERECORD_URL, formData)
      console.log('editLeaverecord formData successfully: ', result)
      setTimeout(() => {
        navigate('/leaverecord')
      },5000)
    } catch (error) {
      // failed
      console.log('editLeaverecord formData Error: ', error.toString())
    }
  }
}