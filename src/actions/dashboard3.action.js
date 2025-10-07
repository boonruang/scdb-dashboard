import {
  HTTP_DASHBOARD3_FAILED,
  HTTP_DASHBOARD3_FETCHING,
  HTTP_DASHBOARD3_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateDashboardToSuccess = (payload) => ({
  type: HTTP_DASHBOARD3_SUCCESS,
  payload
});

const setStateDashboardToFetching = () => ({
  type: HTTP_DASHBOARD3_FETCHING
});

const setStateDashboardToFailed = () => ({
  type: HTTP_DASHBOARD3_FAILED
});

export const getDashboard = () => {
  return (dispatch) => {
    dispatch(setStateDashboardToFetching());
    doGetDashboard(dispatch);
  };
};

const doGetDashboard = (dispatch) => {
  httpClient
    .get(`${server.DASHBOARD3_URL}/list`)
    .then((result) => {
      dispatch(setStateDashboardToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateDashboardToFailed());
    });
};

