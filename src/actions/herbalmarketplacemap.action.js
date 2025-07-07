import {
  HTTP_HERBALMARKETPLACE_MAP_FETCHING,
  HTTP_HERBALMARKETPLACE_MAP_SUCCESS,
  HTTP_HERBALMARKETPLACE_MAP_FAILED,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

export const setStateHerbalmarketplaceMapSuccess = (payload) => ({
  type: HTTP_HERBALMARKETPLACE_MAP_SUCCESS,
  payload
});

export const setStateHerbalmarketplaceMapToFetching = () => ({
  type: HTTP_HERBALMARKETPLACE_MAP_FETCHING
});

const setStateHerbalmarketplaceMapToFailed = () => ({
  type: HTTP_HERBALMARKETPLACE_MAP_FAILED
});



export const getHerbalmarketplaceByKeyword = (searchTerm) => {
  console.log('getHerbalmarketplaceByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getHerbalmarketplaceByKeyword dispatch is called ',keyword)
    dispatch(setStateHerbalmarketplaceMapToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.HERBALMARKETPLACE_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateHerbalmarketplaceMapSuccess(result.data));
          console.log('setStateHerbalmarketplaceMapSuccess is called ',result.data)
        });
        } 
        else {
          doGetHerbalmarketplaces(dispatch);
        }
  };
};


// get all for maps (geojson)
export const doGetHerbalmarketplaces = (dispatch) => {
  httpClient
    .get(`${server.HERBALMARKETPLACE_URL}/list/all`)
    .then((result) => {
      dispatch(setStateHerbalmarketplaceMapSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateHerbalmarketplaceMapToFailed());
    });
};
