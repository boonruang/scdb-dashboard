import {
  HTTP_FARMERGROUP_FAILED,
  HTTP_FARMERGROUP_FETCHING,
  HTTP_FARMERGROUP_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateFarmergroupToSuccess = (payload) => ({
  type: HTTP_FARMERGROUP_SUCCESS,
  payload
});

const setStateFarmergroupToFetching = () => ({
  type: HTTP_FARMERGROUP_FETCHING
});

const setStateFarmergroupToFailed = () => ({
  type: HTTP_FARMERGROUP_FAILED
});


export const getFarmergroupByKeyword = (searchTerm) => {
  console.log('getFarmergroupByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getFarmergroupByKeyword dispatch is called ',keyword)
    dispatch(setStateFarmergroupToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.FARMERGROUP_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateFarmergroupToSuccess(result.data));
          console.log('setStateFarmergroupToSuccess is called ',result.data)
        });
        } 
        else {
          doGetFarmergroups(dispatch);
        }
  };
};

export const deleteFarmergroup = (id) => {
  return async (dispatch) => {
    dispatch(setStateFarmergroupToFetching());
    await httpClient.delete(`${server.FARMERGROUP_URL}/${id}`);
    await doGetAllFarmergroup(dispatch);
  };
};

// export const getFarmergroup = () => {
//   return (dispatch) => {
//     dispatch(setStateFarmergroupToFetching());
//     doGetFarmergroup(dispatch);
//   };
// };

export const getAllFarmergroup = () => {
  return (dispatch) => {
    dispatch(setStateFarmergroupToFetching());
    doGetAllFarmergroup(dispatch);
  };
};

// const doGetFarmergroup = (dispatch) => {
//   httpClient
//     .get(`${server.FARMERGROUP_URL}/list/noauth`)
//     .then((result) => {
//       dispatch(setStateFarmergroupToSuccess(result.data));
//     })
//     .catch((error) => {
//       alert(JSON.stringify(error));
//       dispatch(setStateFarmergroupToFailed());
//     });
// };

export const getFarmergroups = () => {
  return (dispatch) => {
    dispatch(setStateFarmergroupToFetching());
    doGetFarmergroups(dispatch);
  };
};

const doGetFarmergroups = (dispatch) => {
  httpClient
    .get(`${server.FARMERGROUP_URL}/list/all`)
    .then((result) => {
      dispatch(setStateFarmergroupToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateFarmergroupToFailed());
    });
};

const doGetAllFarmergroup = (dispatch) => {
  httpClient
    .get(`${server.FARMERGROUP_URL}/list`)
    .then((result) => {
      dispatch(setStateFarmergroupToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateFarmergroupToFailed());
    });
};

export const addFarmergroup = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.FARMERGROUP_URL, formData)
      console.log('addFarmergroup formData successfully: ', result)
      navigate('/farmergroup')
    } catch (error) {
      // failed
      console.log('addFarmergroup formData Error: ', error.toString())
    }
  }
}

export const updateFarmergroup = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.FARMERGROUP_URL, formData)
      console.log('updated Farmergroup formData successfully: ', result)
      navigate('/farmergroup')
    } catch (error) {
      // failed
      console.log('updated Farmergroup formData Error: ', error.toString())
    }
  }
}

export const getFarmergroupsShortlist = () => {
  return (dispatch) => {
    dispatch(setStateFarmergroupToFetching());
    doGetFarmergroupsShortlist(dispatch);
  };
};

const doGetFarmergroupsShortlist = (dispatch) => {
  httpClient
    .get(`${server.FARMERGROUP_URL}/shortlist`)
    .then((result) => {
      dispatch(setStateFarmergroupToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateFarmergroupToFailed());
    });
};


