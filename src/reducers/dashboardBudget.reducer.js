import {
  HTTP_DASHBOARD_BUDGET_FAILED,
  HTTP_DASHBOARD_BUDGET_FETCHING,
  HTTP_DASHBOARD_BUDGET_SUCCESS,
  HTTP_DASHBOARD_BUDGET_PROJECTS_FAILED,
  HTTP_DASHBOARD_BUDGET_PROJECTS_FETCHING,
  HTTP_DASHBOARD_BUDGET_PROJECTS_SUCCESS,
} from '../constants';

const initialState = {
  summary: null,
  isFetchingSummary: false,
  isErrorSummary: false,

  projects: null,
  isFetchingProjects: false,
  isErrorProjects: false,
};

const dashboardBudgetReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_DASHBOARD_BUDGET_FETCHING:
      return { ...state, summary: null, isFetchingSummary: true, isErrorSummary: false };
    case HTTP_DASHBOARD_BUDGET_SUCCESS:
      // API response: { result: { fiscalYear, kpi: {...} } }
      return { ...state, summary: payload.result, isFetchingSummary: false, isErrorSummary: false };
    case HTTP_DASHBOARD_BUDGET_FAILED:
      return { ...state, summary: null, isFetchingSummary: false, isErrorSummary: true };

    case HTTP_DASHBOARD_BUDGET_PROJECTS_FETCHING:
      return { ...state, isFetchingProjects: true, isErrorProjects: false };
    case HTTP_DASHBOARD_BUDGET_PROJECTS_SUCCESS:
      // API response: { result: { total, page, limit, data: [...] } }
      return { ...state, projects: payload.result, isFetchingProjects: false, isErrorProjects: false };
    case HTTP_DASHBOARD_BUDGET_PROJECTS_FAILED:
      return { ...state, projects: null, isFetchingProjects: false, isErrorProjects: true };

    default:
      return state;
  }
};

export default dashboardBudgetReducer;
