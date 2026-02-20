import {
  HTTP_DASHBOARD_RESEARCH_FAILED,
  HTTP_DASHBOARD_RESEARCH_FETCHING,
  HTTP_DASHBOARD_RESEARCH_SUCCESS,
  HTTP_DASHBOARD_RESEARCH_PUB_FAILED,
  HTTP_DASHBOARD_RESEARCH_PUB_FETCHING,
  HTTP_DASHBOARD_RESEARCH_PUB_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

// ── Summary (KPI + Charts) ──────────────────────────────────────────

const setStateSummaryFetching = () => ({ type: HTTP_DASHBOARD_RESEARCH_FETCHING });
const setStateSummarySuccess  = (payload) => ({ type: HTTP_DASHBOARD_RESEARCH_SUCCESS, payload });
const setStateSummaryFailed   = () => ({ type: HTTP_DASHBOARD_RESEARCH_FAILED });

export const getResearchSummary = (fiscalYear) => (dispatch) => {
  dispatch(setStateSummaryFetching());
  const params = fiscalYear ? { params: { fiscalYear } } : {};
  httpClient
    .get(`${server.DASHBOARD_RESEARCH_URL}/summary`, params)
    .then((result) => dispatch(setStateSummarySuccess(result.data)))
    .catch(() => dispatch(setStateSummaryFailed()));
};

// ── Publications list ───────────────────────────────────────────────

const setStatePubFetching = () => ({ type: HTTP_DASHBOARD_RESEARCH_PUB_FETCHING });
const setStatePubSuccess  = (payload) => ({ type: HTTP_DASHBOARD_RESEARCH_PUB_SUCCESS, payload });
const setStatePubFailed   = () => ({ type: HTTP_DASHBOARD_RESEARCH_PUB_FAILED });

export const getResearchPublications = ({ fiscalYear, search = '', dept = '', quartile = '', page = 1, limit = 20 } = {}) => (dispatch) => {
  dispatch(setStatePubFetching());
  httpClient
    .get(`${server.DASHBOARD_RESEARCH_URL}/publications`, {
      params: { fiscalYear, search, dept, quartile, page, limit }
    })
    .then((result) => dispatch(setStatePubSuccess(result.data)))
    .catch(() => dispatch(setStatePubFailed()));
};
