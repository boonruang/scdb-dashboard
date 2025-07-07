import {
  HTTP_HERBAL_PRICEYEAR_SUCCESS,
  HTTP_HERBAL_PRICEYEAR_FAILED,
  HTTP_HERBAL_PRICEYEAR_FETCHING,    
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

export const setStateHerbalPriceyearToFetching = () => ({
  type: HTTP_HERBAL_PRICEYEAR_FETCHING
});

export const setStateHerbalPriceyearToSuccess = (payload) => ({
  type: HTTP_HERBAL_PRICEYEAR_SUCCESS,
  payload
});

const setStateHerbalPriceyearToFailed = () => ({
  type: HTTP_HERBAL_PRICEYEAR_FAILED
});

export const getHerbalPriceyear = (years,herbals) => {
  return (dispatch) => {
    dispatch(setStateHerbalPriceyearToFetching());
    httpClient
      .get(`${server.PRICE_URL}/year/${years}/${herbals}`)
      .then((result) => {
        dispatch(setStateHerbalPriceyearToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateHerbalPriceyearToFailed());
      });
  };
};


