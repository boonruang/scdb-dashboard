import {
  HTTP_REGISTER_FAILED,
  HTTP_REGISTER_FETCHING,
  HTTP_REGISTER_SUCCESS,
  HTTP_REGISTER_SELECTED_SUCCESS,
  HTTP_REGISTER_SELECTED_FAILED,
  HTTP_REGISTER_SELECTED_FETCHING,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateFarmersRegisterToSuccess = (payload) => ({
  type: HTTP_REGISTER_SUCCESS,
  payload
});

const setStateFarmersRegisterToFetching = () => ({
  type: HTTP_REGISTER_FETCHING
});

const setStateFarmersRegisterToFailed = () => ({
  type: HTTP_REGISTER_FAILED
});


export const setStateFarmersRegisterSelectedToFetching = () => ({
  type: HTTP_REGISTER_SELECTED_FETCHING
});

export const setStateFarmersRegisterSelectedToSuccess = (payload) => ({
  type: HTTP_REGISTER_SELECTED_SUCCESS,
  payload
});

const setStateFarmersRegisterSelectedToFailed = () => ({
  type: HTTP_REGISTER_SELECTED_FAILED
});

export const getFarmersRegisterById = (id) => {
  return (dispatch) => {
    dispatch(setStateFarmersRegisterSelectedToFetching());
    httpClient
      .get(`${server.REGISTER_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateFarmersRegisterSelectedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateFarmersRegisterSelectedToFailed());
      });
  };
};


export const setFarmersRegisterApproveById = (id) => {
  return (dispatch) => {
    httpClient
      .get(`${server.REGISTER_URL}/approve/${id}`)
      .then((result) => {
        doGetFarmersRegisterStatus(dispatch);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const setFarmersRegisterNotApproveById = (id) => {
  return (dispatch) => {
    httpClient
      .get(`${server.REGISTER_URL}/notapprove/${id}`)
      .then((result) => {
        doGetFarmersRegisterStatus(dispatch);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};


export const getFarmersRegisterByKeyword = (searchTerm) => {
  console.log('getFarmersRegisterByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getFarmersRegisterByKeyword dispatch is called ',keyword)
    dispatch(setStateFarmersRegisterToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.REGISTER_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateFarmersRegisterToSuccess(result.data));
          console.log('setStateFarmersRegisterToSuccess is called ',result.data)
        });
        } 
        else {
          doGetFarmersRegister(dispatch);
        }
  };
};

export const deleteFarmersRegister = (id) => {
  return async (dispatch) => {
    dispatch(setStateFarmersRegisterToFetching());
    await httpClient.delete(`${server.REGISTER_URL}/${id}`);
    await doGetFarmersRegister(dispatch);
  };
};

export const getFarmersRegister = () => {
  return (dispatch) => {
    dispatch(setStateFarmersRegisterToFetching());
    doGetFarmersRegister(dispatch);
  };
};

const doGetFarmersRegister = (dispatch) => {
  httpClient
    .get(`${server.REGISTER_URL}/list`)
    .then((result) => {
      dispatch(setStateFarmersRegisterToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateFarmersRegisterToFailed());
    });
};

export const getFarmersRegisterStatus = () => {
  return (dispatch) => {
    dispatch(setStateFarmersRegisterToFetching());
    doGetFarmersRegisterStatus(dispatch);
  };
};

const doGetFarmersRegisterStatus = (dispatch) => {
  httpClient
    .get(`${server.REGISTER_URL}/status`)
    .then((result) => {
      dispatch(setStateFarmersRegisterToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateFarmersRegisterToFailed());
    });
};

export const getFarmersRegisterReset = () => {
  return (dispatch) => {
    dispatch(setStateFarmersRegisterToFetching());
    doGetFarmersRegisterReset(dispatch);
  };
};

const doGetFarmersRegisterReset = (dispatch) => {
  httpClient
    .get(`${server.REGISTER_URL}/reset`)
    .then((result) => {
      dispatch(setStateFarmersRegisterToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateFarmersRegisterToFailed());
    });
};

export const getFarmersRegisterReject = () => {
  return (dispatch) => {
    dispatch(setStateFarmersRegisterToFetching());
    doGetFarmersRegisterReject(dispatch);
  };
};

const doGetFarmersRegisterReject = (dispatch) => {
  httpClient
    .get(`${server.REGISTER_URL}/reject`)
    .then((result) => {
      dispatch(setStateFarmersRegisterToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateFarmersRegisterToFailed());
    });
};

export const addFarmersRegister = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.REGISTER_URL, formData)
      console.log('addFarmersRegister formData successfully: ', result)
      navigate('/thankyoureg')
    } catch (error) {
      // failed
      console.log('addFarmersRegister formData Error: ', error.toString())
    }
  }
}

