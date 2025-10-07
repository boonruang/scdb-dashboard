import {
  HTTP_STAFFUPLOADFILE_FAILED,
  HTTP_STAFFUPLOADFILE_FETCHING,
  HTTP_STAFFUPLOADFILE_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateStaffToSuccess = (payload) => ({
  type: HTTP_STAFFUPLOADFILE_SUCCESS,
  payload
});

const setStateStaffToFetching = () => ({
  type: HTTP_STAFFUPLOADFILE_FETCHING
});

const setStateStaffToFailed = () => ({
  type: HTTP_STAFFUPLOADFILE_FAILED
});


export const getStaffById = (id) => {
  return (dispatch) => {
    dispatch(setStateStaffToFetching());
    httpClient
      .get(`${server.STAFFUPLOADFILE_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateStaffToSuccess(result.data));
      })
      .catch((error) => {
        console.Staff(error);
        dispatch(setStateStaffToFailed());
      });
  };
};


export const getStaffByKeyword = (searchTerm) => {
  console.Staff('getStaffByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.Staff('getStaffByKeyword dispatch is called ',keyword)
    dispatch(setStateStaffToFetching());
    if (keyword !== null && keyword !== '') {
      console.Staff('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.STAFFUPLOADFILE_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateStaffToSuccess(result.data));
          console.Staff('setStateStaffToSuccess is called ',result.data)
        });
        } 
        else {
          doGetStaff(dispatch);
        }
  };
};

export const deleteStaff = (id) => {
  return async (dispatch) => {
    dispatch(setStateStaffToFetching());
    await httpClient.delete(`${server.STAFFUPLOADFILE_URL}/${id}`);
    await doGetStaff(dispatch);
  };
};

export const getStaff = () => {
  return (dispatch) => {
    dispatch(setStateStaffToFetching());
    doGetStaff(dispatch);
  };
};

const doGetStaff = (dispatch) => {
  httpClient
    .get(`${server.STAFFUPLOADFILE_URL}/list`)
    .then((result) => {
      dispatch(setStateStaffToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateStaffToFailed());
    });
};

export const addStaff = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.STAFFUPLOADFILE_URL, formData)
      console.log('addStaff formData successfully: ', result)
      setTimeout(() => {
        navigate('/staff')
      },3000)
    } catch (error) {
      // failed
      console.log('addStaff formData Error: ', error.toString())
    }
  }
}

export const updateStaff = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.STAFFUPLOADFILE_URL, formData)
      console.log('editStaff formData successfully: ', result)
      setTimeout(() => {
        navigate('/staff')
      },3000)
    } catch (error) {
      // failed
      console.log('editStaff formData Error: ', error.toString())
    }
  }
}

export const uploadFile = (navigate, formData) => {
  console.log('uploadExcelFile action',navigate)
  console.log('uploadExcelFile action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.STAFFUPLOADFILE_URL, formData)
      console.log('uploadFile formData successfully: ', result)
    } catch (error) {
      // failed
      console.log('uploadFile formData Error: ', error.toString())
    }
  }
}
