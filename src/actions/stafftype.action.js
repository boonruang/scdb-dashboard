import {
  HTTP_STAFFTYPE_FAILED,
  HTTP_STAFFTYPE_FETCHING,
  HTTP_STAFFTYPE_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateStafftypeToSuccess = (payload) => ({
  type: HTTP_STAFFTYPE_SUCCESS,
  payload
});

const setStateStafftypeToFetching = () => ({
  type: HTTP_STAFFTYPE_FETCHING
});

const setStateStafftypeToFailed = () => ({
  type: HTTP_STAFFTYPE_FAILED
});


export const getStafftypeById = (id) => {
  return (dispatch) => {
    dispatch(setStateStafftypeToFetching());
    httpClient
      .get(`${server.STAFFTYPE_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateStafftypeToSuccess(result.data));
      })
      .catch((error) => {
        console.Stafftype(error);
        dispatch(setStateStafftypeToFailed());
      });
  };
};


export const getStafftypeByKeyword = (searchTerm) => {
  console.Stafftype('getStafftypeByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.Stafftype('getStafftypeByKeyword dispatch is called ',keyword)
    dispatch(setStateStafftypeToFetching());
    if (keyword !== null && keyword !== '') {
      console.Stafftype('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.STAFFTYPE_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateStafftypeToSuccess(result.data));
          console.Stafftype('setStateStafftypeToSuccess is called ',result.data)
        });
        } 
        else {
          doGetStafftype(dispatch);
        }
  };
};

export const deleteStafftype = (id) => {
  return async (dispatch) => {
    dispatch(setStateStafftypeToFetching());
    await httpClient.delete(`${server.STAFFTYPE_URL}/${id}`);
    await doGetStafftype(dispatch);
  };
};

export const getStafftype = () => {
  return (dispatch) => {
    dispatch(setStateStafftypeToFetching());
    doGetStafftype(dispatch);
  };
};

const doGetStafftype = (dispatch) => {
  httpClient
    .get(`${server.STAFFTYPE_URL}/list`)
    .then((result) => {
      dispatch(setStateStafftypeToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateStafftypeToFailed());
    });
};

export const addStafftype = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.STAFFTYPE_URL, formData)
      console.log('addStafftype formData successfully: ', result)
      setTimeout(() => {
        navigate('/stafftype')
      },5000)
    } catch (error) {
      // failed
      console.log('addStafftype formData Error: ', error.toString())
    }
  }
}

export const updateStafftype = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.STAFFTYPE_URL, formData)
      console.log('editStafftype formData successfully: ', result)
      setTimeout(() => {
        navigate('/stafftype')
      },5000)
    } catch (error) {
      // failed
      console.log('editStafftype formData Error: ', error.toString())
    }
  }
}