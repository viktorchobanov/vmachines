import { SET_STATISTICS_DATA } from "../actions/types";
import isEmpty from "lodash/isEmpty";

const initialState = {
    lineChart: {
      data: [],
      labels: []
    },
    pieChart: {
      data: [],
      labels: []
    },
    barChart: {
      data: [],
      labels: []
    }
  };

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_STATISTICS_DATA:
      return {
        statistics: action.statistics
      };

    default:
      return state;
  }
};
