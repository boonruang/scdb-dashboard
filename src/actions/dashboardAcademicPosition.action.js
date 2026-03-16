import {
  HTTP_DASHBOARD6_FAILED,
  HTTP_DASHBOARD6_FETCHING,
  HTTP_DASHBOARD6_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

const setFetching = () => ({ type: HTTP_DASHBOARD6_FETCHING });
const setSuccess  = (payload) => ({ type: HTTP_DASHBOARD6_SUCCESS, payload });
const setFailed   = () => ({ type: HTTP_DASHBOARD6_FAILED });

export const getAcademicPositionList = ({ position = '', dept = '', search = '', page = 1, limit = 10 } = {}) => (dispatch) => {
  dispatch(setFetching());
  Promise.all([
    httpClient.get(`${server.DASHBOARD6_URL}/list`, { params: { position, dept, search, page, limit } }),
    httpClient.get(`${server.DASHBOARD6_URL}/summary`),
  ])
    .then(([listRes, summaryRes]) => {
      const listResult    = listRes.data?.result || {}
      const summaryResult = summaryRes.data?.result || {}
      dispatch(setSuccess({ list: listResult, summary: summaryResult }))
    })
    .catch(() => dispatch(setFailed()));
};
