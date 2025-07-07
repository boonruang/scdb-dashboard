import {
  HTTP_FARMER_SELECTED_SUCCESS,
  HTTP_FARMER_SELECTED_FAILED,
  HTTP_FARMER_SELECTED_FETCHING,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';


export const setStateFarmerSelectedToFetching = () => ({
  type: HTTP_FARMER_SELECTED_FETCHING
});

export const setStateFarmerSelectedToSuccess = (payload) => ({
  type: HTTP_FARMER_SELECTED_SUCCESS,
  payload
});

const setStateFarmerSelectedToFailed = () => ({
  type: HTTP_FARMER_SELECTED_FAILED
});

export const getFarmerById = (id) => {
  return (dispatch) => {
    dispatch(setStateFarmerSelectedToFetching());
    httpClient
      .get(`${server.FARMER_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateFarmerSelectedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateFarmerSelectedToFailed());
      });
  };
};


export const updateFarmer = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.FARMER_URL, formData)
      console.log('updated Farmer formData successfully: ', result)
      navigate('/farmer')
    } catch (error) {
      // failed
      console.log('updated Farmer formData Error: ', error.toString())
    }
  }
}
