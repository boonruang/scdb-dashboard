import {
  HTTP_HERBAL_PAGINATION_FETCHING,
  HTTP_HERBAL_PAGINATION_SUCCESS,
  HTTP_HERBAL_PAGINATION_FAILED,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';


const setStateHerbalPaginationToSuccess = (payload) => ({
  type: HTTP_HERBAL_PAGINATION_SUCCESS,
  payload
});

const setStateHerbalPaginationToFetching = () => ({
  type: HTTP_HERBAL_PAGINATION_FETCHING
});

const setStateHerbalPaginationToFailed = () => ({
  type: HTTP_HERBAL_PAGINATION_FAILED
});


export const getHerbalsPage = (pagination) => {
  return (dispatch) => {
    dispatch(setStateHerbalPaginationToFetching());
    doGetHerbalsPage(dispatch,pagination);
  };
};

const doGetHerbalsPage = (dispatch,pagination) => {
  httpClient
    .get(`${server.HERBAL_URL}/page`,{params: pagination})
    .then((result) => {
      dispatch(setStateHerbalPaginationToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateHerbalPaginationToFailed());
    });
};
