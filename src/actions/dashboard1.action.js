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

export const getDashboard = (fiscalYear) => {
  return (dispatch) => {
    dispatch(setStateDashboardToFetching());
    doGetDashboard(dispatch, fiscalYear);
  };
};

const doGetDashboard = (dispatch, fiscalYear) => {
  httpClient
    .get(`${server.DASHBOARD1_URL}/list`, { params: { fiscalYear } })
    .then((result) => {
      dispatch(setStateDashboardToSuccess(result.data));
    })
    .catch((error) => {
      alert(JSON.stringify(error));
      dispatch(setStateDashboardToFailed());
    });
};

