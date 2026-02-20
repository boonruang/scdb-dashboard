import {
  HTTP_DASHBOARD_BUDGET_FAILED,
  HTTP_DASHBOARD_BUDGET_FETCHING,
  HTTP_DASHBOARD_BUDGET_SUCCESS,
  HTTP_DASHBOARD_BUDGET_PROJECTS_FAILED,
  HTTP_DASHBOARD_BUDGET_PROJECTS_FETCHING,
  HTTP_DASHBOARD_BUDGET_PROJECTS_SUCCESS,
  server
} from '../constants';
import { httpClient } from '../utils/HttpClient';

// ── Summary (KPI) ────────────────────────────────────────────────────

const setStateSummaryFetching = () => ({ type: HTTP_DASHBOARD_BUDGET_FETCHING });
const setStateSummarySuccess  = (payload) => ({ type: HTTP_DASHBOARD_BUDGET_SUCCESS, payload });
const setStateSummaryFailed   = () => ({ type: HTTP_DASHBOARD_BUDGET_FAILED });

export const getBudgetSummary = (fiscalYear) => (dispatch) => {
  dispatch(setStateSummaryFetching());
  const params = fiscalYear ? { params: { fiscalYear } } : {};
  httpClient
    .get(`${server.DASHBOARD_BUDGET_URL}/summary`, params)
    .then((result) => dispatch(setStateSummarySuccess(result.data)))
    .catch(() => dispatch(setStateSummaryFailed()));
};

// ── Projects list ────────────────────────────────────────────────────

const setStateProjectsFetching = () => ({ type: HTTP_DASHBOARD_BUDGET_PROJECTS_FETCHING });
const setStateProjectsSuccess  = (payload) => ({ type: HTTP_DASHBOARD_BUDGET_PROJECTS_SUCCESS, payload });
const setStateProjectsFailed   = () => ({ type: HTTP_DASHBOARD_BUDGET_PROJECTS_FAILED });

export const getBudgetProjects = ({ fiscalYear, search = '', budgetType = '', page = 1, limit = 10 } = {}) => (dispatch) => {
  dispatch(setStateProjectsFetching());
  httpClient
    .get(`${server.DASHBOARD_BUDGET_URL}/projects`, {
      params: { fiscalYear, search, budgetType, page, limit }
    })
    .then((result) => dispatch(setStateProjectsSuccess(result.data)))
    .catch(() => dispatch(setStateProjectsFailed()));
};
