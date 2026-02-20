import {
  HTTP_DASHBOARD_RESEARCH_FAILED,
  HTTP_DASHBOARD_RESEARCH_FETCHING,
  HTTP_DASHBOARD_RESEARCH_SUCCESS,
  HTTP_DASHBOARD_RESEARCH_PUB_FAILED,
  HTTP_DASHBOARD_RESEARCH_PUB_FETCHING,
  HTTP_DASHBOARD_RESEARCH_PUB_SUCCESS,
} from '../constants';

const initialState = {
  summary: null,
  isFetchingSummary: false,
  isErrorSummary: false,

  publications: null,
  isFetchingPub: false,
  isErrorPub: false,
};

const dashboardResearchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HTTP_DASHBOARD_RESEARCH_FETCHING:
      return { ...state, summary: null, isFetchingSummary: true, isErrorSummary: false };
    case HTTP_DASHBOARD_RESEARCH_SUCCESS:
      return { ...state, summary: payload, isFetchingSummary: false, isErrorSummary: false };
    case HTTP_DASHBOARD_RESEARCH_FAILED:
      return { ...state, summary: null, isFetchingSummary: false, isErrorSummary: true };

    case HTTP_DASHBOARD_RESEARCH_PUB_FETCHING:
      return { ...state, isFetchingPub: true, isErrorPub: false };
    case HTTP_DASHBOARD_RESEARCH_PUB_SUCCESS:
      return { ...state, publications: payload, isFetchingPub: false, isErrorPub: false };
    case HTTP_DASHBOARD_RESEARCH_PUB_FAILED:
      return { ...state, publications: null, isFetchingPub: false, isErrorPub: true };

    default:
      return state;
  }
};

export default dashboardResearchReducer;
