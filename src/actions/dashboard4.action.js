import {
  HTTP_DASHBOARD4_FAILED,
  HTTP_DASHBOARD4_FETCHING,
  HTTP_DASHBOARD4_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateDashboardToSuccess = (payload) => ({
  type: HTTP_DASHBOARD4_SUCCESS,
  payload
});

const setStateDashboardToFetching = () => ({
  type: HTTP_DASHBOARD4_FETCHING
});

const setStateDashboardToFailed = () => ({
  type: HTTP_DASHBOARD4_FAILED
});

export const getDashboard = () => {
  return (dispatch) => {
    dispatch(setStateDashboardToFetching());
    doGetDashboard(dispatch);
  };
};

const doGetDashboard = (dispatch) => {
  httpClient
    .get(`${server.DASHBOARD4_URL}/list`)
    .then((result) => {
      dispatch(setStateDashboardToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateDashboardToFailed());
    });
};

