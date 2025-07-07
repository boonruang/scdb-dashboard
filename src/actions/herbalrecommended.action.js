import {
  HTTP_HERBAL_RECOMMENDED_SUCCESS,
  HTTP_HERBAL_RECOMMENDED_FAILED,
  HTTP_HERBAL_RECOMMENDED_FETCHING,    
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

export const setStateHerbalRecommendedToFetching = () => ({
  type: HTTP_HERBAL_RECOMMENDED_FETCHING
});

export const setStateHerbalRecommendedToSuccess = (payload) => ({
  type: HTTP_HERBAL_RECOMMENDED_SUCCESS,
  payload
});

const setStateHerbalRecommendedToFailed = () => ({
  type: HTTP_HERBAL_RECOMMENDED_FAILED
});


export const getHerbalByRecommended = (ph,soil) => {
  console.log('herbal acton ph:', ph + ' AND ' + soil)
  return (dispatch) => {
    dispatch(setStateHerbalRecommendedToFetching());
    httpClient
      .get(`${server.HERBAL_URL}/show/${ph}/${soil}`)
      .then((result) => {
        dispatch(setStateHerbalRecommendedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateHerbalRecommendedToFailed());
      });
  };
};


