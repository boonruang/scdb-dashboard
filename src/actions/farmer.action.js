import {
  HTTP_FARMER_FAILED,
  HTTP_FARMER_FETCHING,
  HTTP_FARMER_SUCCESS,
  HTTP_FARMER_CHANGE_PASSWORD_SUCCESS,
  HTTP_FARMER_CHANGE_PASSWORD_FAILURE,
  HTTP_FARMER_SELFREGISTER_SUCCESS,
  HTTP_FARMER_SELFREGISTER_FAILURE,
  // HTTP_FARMER_SELECTED_SUCCESS,
  // HTTP_FARMER_SELECTED_FAILED,
  // HTTP_FARMER_SELECTED_FETCHING,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateFarmerToSuccess = (payload) => ({
  type: HTTP_FARMER_SUCCESS,
  payload
});

const setStateFarmerToFetching = () => ({
  type: HTTP_FARMER_FETCHING
});

const setStateFarmerToFailed = () => ({
  type: HTTP_FARMER_FAILED
});


// export const setStateFarmerSelectedToFetching = () => ({
//   type: HTTP_FARMER_SELECTED_FETCHING
// });

// export const setStateFarmerSelectedToSuccess = (payload) => ({
//   type: HTTP_FARMER_SELECTED_SUCCESS,
//   payload
// });

// const setStateFarmerSelectedToFailed = () => ({
//   type: HTTP_FARMER_SELECTED_FAILED
// });

// export const getFarmerById = (id) => {
//   return (dispatch) => {
//     dispatch(setStateFarmerSelectedToFetching());
//     httpClient
//       .get(`${server.FARMER_URL}/select/${id}`)
//       .then((result) => {
//         dispatch(setStateFarmerSelectedToSuccess(result.data));
//       })
//       .catch((error) => {
//         console.log(error);
//         dispatch(setStateFarmerSelectedToFailed());
//       });
//   };
// };


export const getFarmerByKeyword = (searchTerm) => {
  console.log('getFarmerByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getFarmerByKeyword dispatch is called ',keyword)
    dispatch(setStateFarmerToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.FARMER_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateFarmerToSuccess(result.data));
          console.log('setStateFarmerToSuccess is called ',result.data)
        });
        } 
        else {
          doGetFarmers(dispatch);
        }
  };
};

export const deleteFarmer = (id) => {
  return async (dispatch) => {
    dispatch(setStateFarmerToFetching());
    await httpClient.delete(`${server.FARMER_URL}/${id}`);
    doGetFarmers(dispatch);
  };
};

export const getFarmers = () => {
  return (dispatch) => {
    dispatch(setStateFarmerToFetching());
    doGetFarmers(dispatch);
  };
};

const doGetFarmers = (dispatch) => {
  httpClient
    .get(`${server.FARMER_URL}/list`,)
    .then((result) => {
      dispatch(setStateFarmerToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateFarmerToFailed());
    });
};

export const getFarmersShortlist = () => {
  return (dispatch) => {
    dispatch(setStateFarmerToFetching());
    doGetFarmersShortlist(dispatch);
  };
};

const doGetFarmersShortlist = (dispatch) => {
  httpClient
    .get(`${server.FARMER_URL}/shortlist`,)
    .then((result) => {
      dispatch(setStateFarmerToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateFarmerToFailed());
    });
};

// export const getFarmersPage = (pagination) => {
//   return (dispatch) => {
//     dispatch(setStateFarmerToFetching());
//     doGetFarmersPage(dispatch,pagination);
//   };
// };

// const doGetFarmersPage = (dispatch,pagination) => {
//   httpClient
//     .get(`${server.FARMER_URL}/page`, {params: pagination})
//     .then((result) => {
//       dispatch(setStateFarmerToSuccess(result.data));
//     })
//     .catch((error) => {
//       alert(JSON.stringify(error));
//       dispatch(setStateFarmerToFailed());
//     });
// };

export const addFarmer = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.FARMER_URL, formData)
      console.log('addFarmer formData successfully: ', result)
      navigate('/farmer')
    } catch (error) {
      // failed
      console.log('addFarmer formData Error: ', error.toString())
    }
  }
}

export const updateFarmer = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.FARMER_URL, formData)
      console.log('updated Farmer formData successfully: ', result)
      navigate('/farmer')
    } catch (error) {
      // failed
      console.log('updated Farmer formData Error: ', error.toString())
    }
  }
}

export const changePassword = ({username, currentPassword, newPassword, navigate}) => {
  console.log('navigate action',navigate)
  console.log('currentPassword',currentPassword)
  console.log('username',username)
  console.log('newPassword',newPassword)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(`${server.FARMER_URL}/change`,{
        username,
        currentPassword,
        newPassword,
      })

      console.log('changePassword Farmer formData successfully: ', result)

      if (result.data?.result == "ok") {
        dispatch({ type: HTTP_FARMER_CHANGE_PASSWORD_SUCCESS });
        // navigate('/farmer'); 
      } else {
        dispatch({ type: HTTP_FARMER_CHANGE_PASSWORD_FAILURE });
      }
    } catch (error) {
      // failed
      console.log('changePassword Farmer formData Error: ', error.toString())
    }
  }
}

export const resetPassword = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(`${server.FARMER_URL}/reset`, formData)
      console.log('resetFarmerpassword formData successfully: ', result)
      if (result.data?.result == "ok") {
        dispatch({ type: HTTP_FARMER_CHANGE_PASSWORD_SUCCESS });
        // navigate('/farmer'); 
      } else {
        dispatch({ type: HTTP_FARMER_CHANGE_PASSWORD_FAILURE });
      }      
    } catch (error) {
      // failed
      console.log('resetFarmerpassword formData Error: ', error.toString())
    }
  }
}


export const getFarmersPasswordHistoryReset = () => {
  return (dispatch) => {
    dispatch(setStateFarmerToFetching());
    doGetFarmersPasswordHistoryReset(dispatch);
  };
};

const doGetFarmersPasswordHistoryReset = (dispatch) => {
  httpClient
    .get(`${server.FARMER_URL}/passwordhistoryreset`,)
    .then((result) => {
      dispatch(setStateFarmerToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateFarmerToFailed());
    });
};

export const getFarmersHistoryRegister = () => {
  return (dispatch) => {
    dispatch(setStateFarmerToFetching());
    doGetFarmersHistoryRegister(dispatch);
  };
};

const doGetFarmersHistoryRegister = (dispatch) => {
  httpClient
    .get(`${server.FARMER_URL}/historyregister`,)
    .then((result) => {
      dispatch(setStateFarmerToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateFarmerToFailed());
    });
};

export const addFarmersRegister = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(`${server.FARMER_URL}/selfregister`, formData)
      console.log('Self register formData is successfully: ', result)
      if (result.data?.result == "ok") {
        dispatch({ type: HTTP_FARMER_SELFREGISTER_SUCCESS });
        navigate('/thankyoureg'); 
      } else {
        dispatch({ type: HTTP_FARMER_SELFREGISTER_FAILURE });
      }      
    } catch (error) {
      // failed
      console.log('Self register is formData Error: ', error.toString())
    }
  }
}