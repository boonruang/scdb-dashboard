import {
  HTTP_DASHBOARD5_FAILED,
  HTTP_DASHBOARD5_FETCHING,
  HTTP_DASHBOARD5_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateDashboardToSuccess = (payload) => ({
  type: HTTP_DASHBOARD5_SUCCESS,
  payload
});

const setStateDashboardToFetching = () => ({
  type: HTTP_DASHBOARD5_FETCHING
});

const setStateDashboardToFailed = () => ({
  type: HTTP_DASHBOARD5_FAILED
});

export const getDashboard = () => {
  return (dispatch) => {
    dispatch(setStateDashboardToFetching());
    doGetDashboard(dispatch);
  };
};

const doGetDashboard = (dispatch) => {
  httpClient
    .get(`${server.DASHBOARD5_URL}/list`)
    .then((result) => {
      dispatch(setStateDashboardToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateDashboardToFailed());
    });
};

