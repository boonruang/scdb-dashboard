import {
  HTTP_COLLABORATIVEFARM_FAILED,
  HTTP_COLLABORATIVEFARM_FETCHING,
  HTTP_COLLABORATIVEFARM_SUCCESS,
  HTTP_COLLABORATIVEFARM_SELECTED_SUCCESS,
  HTTP_COLLABORATIVEFARM_SELECTED_FAILED,
  HTTP_COLLABORATIVEFARM_SELECTED_FETCHING,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateCollaborativefarmToSuccess = (payload) => ({
  type: HTTP_COLLABORATIVEFARM_SUCCESS,
  payload
});

const setStateCollaborativefarmToFetching = () => ({
  type: HTTP_COLLABORATIVEFARM_FETCHING
});

const setStateCollaborativefarmToFailed = () => ({
  type: HTTP_COLLABORATIVEFARM_FAILED
});


export const setStateCollaborativefarmSelectedToFetching = () => ({
  type: HTTP_COLLABORATIVEFARM_SELECTED_FETCHING
});

export const setStateCollaborativefarmSelectedToSuccess = (payload) => ({
  type: HTTP_COLLABORATIVEFARM_SELECTED_SUCCESS,
  payload
});

const setStateCollaborativefarmSelectedToFailed = () => ({
  type: HTTP_COLLABORATIVEFARM_SELECTED_FAILED
});

export const getCollaborativefarmById = (id) => {
  return (dispatch) => {
    dispatch(setStateCollaborativefarmSelectedToFetching());
    httpClient
      .get(`${server.COLLABORATIVEFARM_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateCollaborativefarmSelectedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateCollaborativefarmSelectedToFailed());
      });
  };
};


export const getCollaborativefarmByKeyword = (searchTerm) => {
  console.log('getCollaborativefarmByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getCollaborativefarmByKeyword dispatch is called ',keyword)
    dispatch(setStateCollaborativefarmToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.COLLABORATIVEFARM_URL}/province/${keyword}`)
        .then((result) => {
          dispatch(setStateCollaborativefarmToSuccess(result.data));
          console.log('setStateCollaborativefarmToSuccess is called ',result.data)
        });
        } 
        else {
          doGetCollaborativefarms(dispatch);
        }
  };
};

export const deleteCollaborativefarm = (id) => {
  return async (dispatch) => {
    dispatch(setStateCollaborativefarmToFetching());
    await httpClient.delete(`${server.COLLABORATIVEFARM_URL}/${id}`);
    await doGetCollaborativefarms(dispatch);
  };
};

export const getCollaborativefarms = () => {
  return (dispatch) => {
    dispatch(setStateCollaborativefarmToFetching());
    doGetCollaborativefarms(dispatch);
  };
};

const doGetCollaborativefarms = (dispatch) => {
  httpClient
    .get(`${server.COLLABORATIVEFARM_URL}/list`)
    .then((result) => {
      dispatch(setStateCollaborativefarmToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateCollaborativefarmToFailed());
    });
};

export const getCollaborativefarmsShortlist = () => {
  return (dispatch) => {
    dispatch(setStateCollaborativefarmToFetching());
    doGetCollaborativefarmsShortlist(dispatch);
  };
};

const doGetCollaborativefarmsShortlist = (dispatch) => {
  httpClient
    .get(`${server.COLLABORATIVEFARM_URL}/shortlist`)
    .then((result) => {
      dispatch(setStateCollaborativefarmToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateCollaborativefarmToFailed());
    });
};

export const addCollaborativefarm = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.COLLABORATIVEFARM_URL, formData)
      console.log('addCollaborativefarm formData successfully: ', result)
      // navigate('/collaborativefarm')
    } catch (error) {
      // failed
      console.log('addCollaborativefarm formData Error: ', error.toString())
    }
  }
}

export const updateCollaborativefarm = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.COLLABORATIVEFARM_URL, formData)
      console.log('updated Collaborativefarm formData successfully: ', result)
      navigate('/collaborativefarm')
    } catch (error) {
      // failed
      console.log('updated Collaborativefarm formData Error: ', error.toString())
    }
  }
}
