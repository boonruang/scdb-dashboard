import {
  HTTP_HERBAL_PRICE_SUCCESS,
  HTTP_HERBAL_PRICE_FAILED,
  HTTP_HERBAL_PRICE_FETCHING,    
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

export const setStateHerbalPriceToFetching = () => ({
  type: HTTP_HERBAL_PRICE_FETCHING
});

export const setStateHerbalPriceToSuccess = (payload) => ({
  type: HTTP_HERBAL_PRICE_SUCCESS,
  payload
});

const setStateHerbalPriceToFailed = () => ({
  type: HTTP_HERBAL_PRICE_FAILED
});


export const getHerbalPrice = () => {
  return (dispatch) => {
    dispatch(setStateHerbalPriceToFetching());
    httpClient
      .get(`${server.PRICE_URL}/day`)
      .then((result) => {
        dispatch(setStateHerbalPriceToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateHerbalPriceToFailed());
      });
  };
};


