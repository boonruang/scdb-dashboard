import {
  HTTP_DASHBOARD2_FAILED,
  HTTP_DASHBOARD2_FETCHING,
  HTTP_DASHBOARD2_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateDashboardToSuccess = (payload) => ({
  type: HTTP_DASHBOARD2_SUCCESS,
  payload
});

const setStateDashboardToFetching = () => ({
  type: HTTP_DASHBOARD2_FETCHING
});

const setStateDashboardToFailed = () => ({
  type: HTTP_DASHBOARD2_FAILED
});

export const getDashboard = () => {
  return (dispatch) => {
    dispatch(setStateDashboardToFetching());
    doGetDashboard(dispatch);
  };
};

const doGetDashboard = (dispatch) => {
  httpClient
    .get(`${server.DASHBOARD2_URL}/list`)
    .then((result) => {
      dispatch(setStateDashboardToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateDashboardToFailed());
    });
};

