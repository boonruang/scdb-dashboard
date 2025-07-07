import {
  HTTP_HERBAL_SELECTED_MAP_SUCCESS,
  HTTP_HERBAL_SELECTED_MAP_FAILED,
  HTTP_HERBAL_SELECTED_MAP_FETCHING,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

export const setStateHerbalSelectedToFetching = () => ({
  type: HTTP_HERBAL_SELECTED_MAP_FETCHING
});

export const setStateHerbalSelectedToSuccess = (payload) => ({
  type: HTTP_HERBAL_SELECTED_MAP_SUCCESS,
  payload
});

const setStateHerbalSelectedToFailed = () => ({
  type: HTTP_HERBAL_SELECTED_MAP_FAILED
});


export const getHerbalSelectedById = (id) => {
  return (dispatch) => {
    dispatch(setStateHerbalSelectedToFetching());
    httpClient
      .get(`${server.HERBAL_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateHerbalSelectedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateHerbalSelectedToFailed());
      });
  };
};

