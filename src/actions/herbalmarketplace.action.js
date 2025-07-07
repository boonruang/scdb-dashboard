import {
  HTTP_HERBALMARKETPLACE_FAILED,
  HTTP_HERBALMARKETPLACE_FETCHING,
  HTTP_HERBALMARKETPLACE_SUCCESS,
  HTTP_HERBALMARKETPLACE_SELECTED_SUCCESS,
  HTTP_HERBALMARKETPLACE_SELECTED_FAILED,
  HTTP_HERBALMARKETPLACE_SELECTED_FETCHING,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateHerbalmarketplaceToSuccess = (payload) => ({
  type: HTTP_HERBALMARKETPLACE_SUCCESS,
  payload
});

const setStateHerbalmarketplaceToFetching = () => ({
  type: HTTP_HERBALMARKETPLACE_FETCHING
});

const setStateHerbalmarketplaceToFailed = () => ({
  type: HTTP_HERBALMARKETPLACE_FAILED
});


export const setStateHerbalmarketplaceSelectedToFetching = () => ({
  type: HTTP_HERBALMARKETPLACE_SELECTED_FETCHING
});

export const setStateHerbalmarketplaceSelectedToSuccess = (payload) => ({
  type: HTTP_HERBALMARKETPLACE_SELECTED_SUCCESS,
  payload
});

const setStateHerbalmarketplaceSelectedToFailed = () => ({
  type: HTTP_HERBALMARKETPLACE_SELECTED_FAILED
});


export const getHerbalmarketplaceById = (id) => {
  return (dispatch) => {
    dispatch(setStateHerbalmarketplaceSelectedToFetching());
    httpClient
      .get(`${server.HERBALMARKETPLACE_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateHerbalmarketplaceSelectedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateHerbalmarketplaceSelectedToFailed());
      });
  };
};


export const deleteHerbalmarketplace = (id) => {
  return async (dispatch) => {
    dispatch(setStateHerbalmarketplaceToFetching());
    await httpClient.delete(`${server.HERBALMARKETPLACE_URL}/${id}`);
    await doGetHerbalmarketplaces(dispatch);
  };
};

export const getHerbalmarketplaces = () => {
  return (dispatch) => {
    dispatch(setStateHerbalmarketplaceToFetching());
    doGetHerbalmarketplaces(dispatch);
  };
};


export const doGetHerbalmarketplaces = (dispatch) => {
  httpClient
    .get(`${server.HERBALMARKETPLACE_URL}/list`)
    .then((result) => {
      dispatch(setStateHerbalmarketplaceToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateHerbalmarketplaceToFailed());
    });
};

export const addHerbalmarketplaces = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.HERBALMARKETPLACE_URL, formData)
      console.log('addHerbalmarketplaces formData successfully: ', result)
      setTimeout(() => {
        navigate('/herbals/marketplace')
      },5000)      
    } catch (error) {
      // failed
      console.log('addHerbalmarketplaces formData Error: ', error.toString())
    }
  }
}

export const updateHerbalmarketplaces = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.HERBALMARKETPLACE_URL, formData)
      console.log('updated Herbalmarketplaces formData successfully: ', result)
      setTimeout(() => {
        navigate('/herbals/marketplace')
      },5000)
    } catch (error) {
      // failed
      console.log('updated Herbalmarketplaces formData Error: ', error.toString())
    }
  }
}
