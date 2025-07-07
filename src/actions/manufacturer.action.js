import {
  HTTP_MANUFACTURER_FAILED,
  HTTP_MANUFACTURER_FETCHING,
  HTTP_MANUFACTURER_SUCCESS,
  HTTP_MANUFACTURER_SELECTED_SUCCESS,
  HTTP_MANUFACTURER_SELECTED_FAILED,
  HTTP_MANUFACTURER_SELECTED_FETCHING,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateManufacturerToSuccess = (payload) => ({
  type: HTTP_MANUFACTURER_SUCCESS,
  payload
});

const setStateManufacturerToFetching = () => ({
  type: HTTP_MANUFACTURER_FETCHING
});

const setStateManufacturerToFailed = () => ({
  type: HTTP_MANUFACTURER_FAILED
});


export const setStateManufacturerSelectedToFetching = () => ({
  type: HTTP_MANUFACTURER_SELECTED_FETCHING
});

export const setStateManufacturerSelectedToSuccess = (payload) => ({
  type: HTTP_MANUFACTURER_SELECTED_SUCCESS,
  payload
});

const setStateManufacturerSelectedToFailed = () => ({
  type: HTTP_MANUFACTURER_SELECTED_FAILED
});

export const getManufacturerById = (id) => {
  return (dispatch) => {
    dispatch(setStateManufacturerSelectedToFetching());
    httpClient
      .get(`${server.MANUFACTURER_URL}/select/${id}`)
      .then((result) => {
        dispatch(setStateManufacturerSelectedToSuccess(result.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setStateManufacturerSelectedToFailed());
      });
  };
};


export const deleteManufacturer = (id) => {
  return async (dispatch) => {
    dispatch(setStateManufacturerToFetching());
    await httpClient.delete(`${server.MANUFACTURER_URL}/${id}`);
    await doGetManufacturer(dispatch);
  };
};

const doGetManufacturer = (dispatch) => {
  httpClient
    .get(`${server.MANUFACTURER_URL}/list/all`)
    .then((result) => {
      dispatch(setStateManufacturerToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateManufacturerToFailed());
    });
};

export const getManufacturer = () => {
  return (dispatch) => {
    dispatch(setStateManufacturerToFetching());
    setGetManufacturer(dispatch);
  };
};

const setGetManufacturer = (dispatch) => {
  httpClient
    .get(`${server.MANUFACTURER_URL}/list`)
    .then((result) => {
      dispatch(setStateManufacturerToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateManufacturerToFailed());
    });
};

export const addManufacturer = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.post(server.MANUFACTURER_URL, formData)
      console.log('addManufacturer formData successfully: ', result)
      setTimeout(() => {
        navigate('/manufacturer')
      },5000)      
    } catch (error) {
      // failed
      console.log('addManufacturer formData Error: ', error.toString())
    }
  }
}

export const updateManufacturer = (navigate, formData) => {
  console.log('navigate action',navigate)
  console.log('formData action',formData)
  return async (dispatch) => {
    try {
      // success
      let result = await httpClient.put(server.MANUFACTURER_URL, formData)
      console.log('updated Manufacturer formData successfully: ', result)
      setTimeout(() => {
        navigate('/manufacturer')
      },5000)
    } catch (error) {
      // failed
      console.log('updated Manufacturer formData Error: ', error.toString())
    }
  }
}
