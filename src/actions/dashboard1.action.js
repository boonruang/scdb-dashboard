import {
  HTTP_DASHBOARD1_FAILED,
  HTTP_DASHBOARD1_FETCHING,
  HTTP_DASHBOARD1_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setStateDashboardToSuccess = (payload) => ({
  type: HTTP_DASHBOARD1_SUCCESS,
  payload
});

const setStateDashboardToFetching = () => ({
  type: HTTP_DASHBOARD1_FETCHING
});

const setStateDashboardToFailed = () => ({
  type: HTTP_DASHBOARD1_FAILED
});

export const getDashboard = () => {
  return (dispatch) => {
    dispatch(setStateDashboardToFetching());
    doGetDashboard(dispatch);
  };
};

const doGetDashboard = (dispatch) => {
  httpClient
    .get(`${server.DASHBOARD1_URL}/list`)
    .then((result) => {
      dispatch(setStateDashboardToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateDashboardToFailed());
    });
};

