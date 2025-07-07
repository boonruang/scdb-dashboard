import {
  HTTP_OUTSOURCE_MAP_FETCHING,
  HTTP_OUTSOURCE_MAP_SUCCESS,
  HTTP_OUTSOURCE_MAP_FAILED,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

export const setStateOutsourceMapSuccess = (payload) => ({
  type: HTTP_OUTSOURCE_MAP_SUCCESS,
  payload
});

export const setStateOutsourceMapToFetching = () => ({
  type: HTTP_OUTSOURCE_MAP_FETCHING
});

const setStateOutsourceMapToFailed = () => ({
  type: HTTP_OUTSOURCE_MAP_FAILED
});



export const getOutsourceByKeyword = (searchTerm) => {
  console.log('getOutsourceByKeyword is called ',searchTerm)
  return (dispatch) => {
    var keyword = searchTerm;
    console.log('getOutsourceByKeyword dispatch is called ',keyword)
    dispatch(setStateOutsourceMapToFetching());
    if (keyword !== null && keyword !== '') {
      console.log('httpClient is called keyword ',keyword)
      httpClient
        .get(`${server.OUTSOURCE_URL}/list/${keyword}`)
        .then((result) => {
          dispatch(setStateOutsourceMapSuccess(result.data));
          console.log('setStateOutsourceMapSuccess is called ',result.data)
        });
        } 
        else {
          doGetOutsources(dispatch);
        }
  };
};


// get all for maps (geojson)
export const doGetOutsources = (dispatch) => {
  httpClient
    .get(`${server.OUTSOURCE_URL}/list/all`)
    .then((result) => {
      dispatch(setStateOutsourceMapSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateOutsourceMapToFailed());
    });
};
