import {
  HTTP_HERBAL_FAILED,
  HTTP_HERBAL_FETCHING,
  HTTP_HERBAL_SUCCESS,
  HERBAL_SEARCH_FETCHING,
  HERBAL_SEARCH_SUCCESS,
  HERBAL_SEARCH_FAILED,
  // HTTP_HERBAL_SELECTED_SUCCESS,
  // HTTP_HERBAL_SELECTED_FAILED,
  // HTTP_HERBAL_SELECTED_FETCHING,
  // SET_PLANTING_SELECTION,  
  // SET_AMPHOE_SELECTION,
  // SET_SOIL_FIELD_SELECTION,
  // HTTP_HERBAL_RECOMMENDED_SUCCESS,
  // HTTP_HERBAL_RECOMMENDED_FAILED,
  // HTTP_HERBAL_RECOMMENDED_FETCHING,    
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateHerbalToSuccess = (payload) => ({
  type: HTTP_HERBAL_SUCCESS,
  payload
});

const setStateHerbalToFetching = () => ({
  type: HTTP_HERBAL_FETCHING
});

const setStateHerbalToFailed = () => ({
  type: HTTP_HERBAL_FAILED
});


const setStateHerbalAutosearchToSuccess = (payload) => ({
  type: HERBAL_SEARCH_SUCCESS,
  payload
});

const setStateHerbalAutosearchToFetching = () => ({
  type: HERBAL_SEARCH_FETCHING
});

const setStateHerbalAutosearchToFailed = () => ({
  type: HERBAL_SEARCH_FAILED
});

// export const setStateHerbalSelectedToFetching = () => ({
//   type: HTTP_HERBAL_SELECTED_FETCHING
// });

// export const setStateHerbalSelectedToSuccess = (payload) => ({
//   type: HTTP_HERBAL_SELECTED_SUCCESS,
//   payload
// });

// const setStateHerbalSelectedToFailed = () => ({
//   type: HTTP_HERBAL_SELECTED_FAILED
// });

// export const setPlantingSelection = (payload) => ({
//   type: SET_PLANTING_SELECTION,
//   payload
// })

// export const setAmphoeSelection = (payload) => ({
//   type: SET_AMPHOE_SELECTION,
//   payload
// })

// export const setSoilFieldSelection = (payload) => ({
//   type: SET_SOIL_FIELD_SELECTION,
//   payload
// })

// export const setStateHerbalRecommendedToFetching = () => ({
//   type: HTTP_HERBAL_RECOMMENDED_FETCHING
// });

// export const setStateHerbalRecommendedToSuccess = (payload) => ({
//   type: HTTP_HERBAL_RECOMMENDED_SUCCESS,
//   payload
// });

// const setStateHerbalRecommendedToFailed = () => ({
//   type: HTTP_HERBAL_RECOMMENDED_FAILED
// });


// export const getHerbalById = (id) => {
//   return (dispatch) => {
//     dispatch(setStateHerbalSelectedToFetching());
//     httpClient
//       .get(`${server.HERBAL_URL}/select/${id}`)
//       .then((result) => {
//         dispatch(setStateHerbalSelectedToSuccess(result.data));
//       })
//       .catch((error) => {
//         console.log(error);
//         dispatch(setStateHerbalSelectedToFailed());
//       });
//   };
// };

export const getHerbalByKeyword = (searchTerm) => {
  console.log('getHerbalByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getHerbalByKeyword dispatch is called ',keyword)
    dispatch(setStateHerbalToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.HERBAL_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateHerbalToSuccess(result.data));
          console.log('setStateHerbalToSuccess is called ',result.data)
        });
    } 
    else {
      doGetHerbals(dispatch);
    }
  };
};

export const searchHerbalByKeyword = (searchTerm) => {
  return (dispatch) => {
    dispatch(setStateHerbalAutosearchToFetching());

    if (searchTerm && searchTerm.trim() !== '') {
      httpClient
        .get(`${server.HERBAL_URL}/list/${searchTerm}`)
        .then((result) => {
          dispatch(setStateHerbalAutosearchToSuccess(result.data));
        })
        .catch((error) => {
          dispatch(setStateHerbalAutosearchToFailed(error));
        });
    } else {
      // ถ้าไม่มี keyword ไม่ต้อง fetch อะไรเลย
      dispatch(setStateHerbalAutosearchToSuccess({ result: [] }));
    }
  };
};

export const deleteHerbal = (id) => {
  return async (dispatch) => {
    dispatch(setStateHerbalToFetching());
    await httpClient.delete(`${server.HERBAL_URL}/${id}`);
    await doGetHerbals(dispatch);
  };
};

export const getHerbals = () => {
  return (dispatch) => {
    dispatch(setStateHerbalToFetching());
    doGetHerbals(dispatch);
  };
};

const doGetHerbals = (dispatch) => {
  httpClient
    .get(`${server.HERBAL_URL}/list`)
    .then((result) => {
      dispatch(setStateHerbalToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateHerbalToFailed());
    });
};

export const getHerbalsShortlist = () => {
  return (dispatch) => {
    dispatch(setStateHerbalToFetching());
    doGetHerbalsShortlist(dispatch);
  };
};

const doGetHerbalsShortlist = (dispatch) => {
  httpClient
    .get(`${server.HERBAL_URL}/shortlist`)
    .then((result) => {
      dispatch(setStateHerbalToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateHerbalToFailed());
    });
};

export const getHerbalsPricelist = () => {
  return (dispatch) => {
    dispatch(setStateHerbalToFetching());
    doGetHerbalsPricelist(dispatch);
  };
};

const doGetHerbalsPricelist = (dispatch) => {
  httpClient
    .get(`${server.HERBAL_URL}/pricelist`)
    .then((result) => {
      dispatch(setStateHerbalToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateHerbalToFailed());
    });
};

// export const getHerbalByRecommended = (ph,soil) => {
//   console.log('herbal acton ph:', ph + ' AND ' + soil)
//   return (dispatch) => {
//     dispatch(setStateHerbalRecommendedToFetching());
//     httpClient
//       .get(`${server.HERBAL_URL}/show/${ph}/${soil}`)
//       .then((result) => {
//         dispatch(setStateHerbalRecommendedToSuccess(result.data));
//       })
//       .catch((error) => {
//         console.log(error);
//         dispatch(setStateHerbalRecommendedToFailed());
//       });
//   };
// };

export const addHerbal = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.HERBAL_URL, formData)
      console.log('addHerbal formData successfully: ', result)
      setTimeout(() => {
        navigate('/herbals/list')
      },5000)      
    } catch (error) {
      // failed
      console.log('addHerbal formData Error: ', error.toString())
    }
  }
}

