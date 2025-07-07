import {
  HTTP_HERBAL_SELECTED_SUCCESS,
  HTTP_HERBAL_SELECTED_FAILED,
  HTTP_HERBAL_SELECTED_FETCHING,
  SET_PLANTING_SELECTION,  
  SET_AMPHOE_SELECTION,
  SET_SOIL_FIELD_SELECTION,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

export const setStateHerbalSelectedToFetching = () => ({
  type: HTTP_HERBAL_SELECTED_FETCHING
});

export const setStateHerbalSelectedToSuccess = (payload) => ({
  type: HTTP_HERBAL_SELECTED_SUCCESS,
  payload
});

const setStateHerbalSelectedToFailed = () => ({
  type: HTTP_HERBAL_SELECTED_FAILED
});

export const setPlantingSelection = (payload) => ({
  type: SET_PLANTING_SELECTION,
  payload
})

export const setAmphoeSelection = (payload) => ({
  type: SET_AMPHOE_SELECTION,
  payload
})

export const setSoilFieldSelection = (payload) => ({
  type: SET_SOIL_FIELD_SELECTION,
  payload
})

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

export const updateHerbal = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.HERBAL_URL, formData)
      console.log('updated Herbal formData successfully: ', result)
      setTimeout(() => {
        navigate('/herbals/list')
      },5000)
    } catch (error) {
      // failed
      console.log('updated Herbal formData Error: ', error.toString())
    }
  }
}

