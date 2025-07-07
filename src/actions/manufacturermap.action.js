import {
  HTTP_MANUFACTURER_MAP_FETCHING,
  HTTP_MANUFACTURER_MAP_SUCCESS,
  HTTP_MANUFACTURER_MAP_FAILED,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

export const setStateManufacturerMapSuccess = (payload) => ({
  type: HTTP_MANUFACTURER_MAP_SUCCESS,
  payload
});

export const setStateManufacturerMapToFetching = () => ({
  type: HTTP_MANUFACTURER_MAP_FETCHING
});

const setStateManufacturerMapToFailed = () => ({
  type: HTTP_MANUFACTURER_MAP_FAILED
});



export const getManufacturerByKeyword = (searchTerm) => {
  console.log('getManufacturerByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getManufacturerByKeyword dispatch is called ',keyword)
    dispatch(setStateManufacturerMapToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.MANUFACTURER_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateManufacturerMapSuccess(result.data));
          console.log('setStateManufacturerMapSuccess is called ',result.data)
        });
        } 
        else {
          doGetManufacturer(dispatch);
        }
  };
};


// get all for maps (geojson)
export const doGetManufacturer = (dispatch) => {
  httpClient
    .get(`${server.MANUFACTURER_URL}/list/all`)
    .then((result) => {
      dispatch(setStateManufacturerMapSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateManufacturerMapToFailed());
    });
};
