import {
  HTTP_MARKETPLACE_FAILED,
  HTTP_MARKETPLACE_FETCHING,
  HTTP_MARKETPLACE_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateMarketplaceToSuccess = (payload) => ({
  type: HTTP_MARKETPLACE_SUCCESS,
  payload
});

const setStateMarketplaceToFetching = () => ({
  type: HTTP_MARKETPLACE_FETCHING
});

const setStateMarketplaceToFailed = () => ({
  type: HTTP_MARKETPLACE_FAILED
});

export const getMarketplaceById = (id) => {
  return (dispatch) => {
    dispatch(setStateMarketplaceToFetching());
    httpClient
      .get(`${server.MARKETPLACE_URL}/${id}`)
      .then((result) => {
        dispatch(setStateMarketplaceToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateMarketplaceToFailed());
      });
  };
};

export const getMarketplaceByKeyword = (searchTerm) => {
  console.log('getMarketplaceByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getMarketplaceByKeyword dispatch is called ',keyword)
    dispatch(setStateMarketplaceToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.MARKETPLACE_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateMarketplaceToSuccess(result.data));
          console.log('setStateMarketplaceToSuccess is called ',result.data)
        });
        } 
        else {
          doGetMarketplaces(dispatch);
        }
  };
};

export const deleteMarketplace = (id) => {
  return async (dispatch) => {
    dispatch(setStateMarketplaceToFetching());
    await httpClient.delete(`${server.MARKETPLACE_URL}/${id}`);
    await doGetMarketplaces(dispatch);
  };
};

export const getMarketplaces = () => {
  return (dispatch) => {
    dispatch(setStateMarketplaceToFetching());
    doGetMarketplaces(dispatch);
  };
};

const doGetMarketplaces = (dispatch) => {
  httpClient
    .get(`${server.MARKETPLACE_URL}/list/all`)
    .then((result) => {
      dispatch(setStateMarketplaceToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateMarketplaceToFailed());
    });
};

