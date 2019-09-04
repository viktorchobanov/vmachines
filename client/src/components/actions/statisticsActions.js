import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import { SET_STATISTICS_DATA } from "./types";
import setAuthorizationToken from "../utils/setAuthorizationToken";
import axios from "axios";

var base = "http://localhost:4000";
var user = jwtDecode(localStorage.getItem("jwtToken")).username;

export function getStatisticsData() {
  return dispatch => {
    var statistics = {};

    var uri = `${base}/api/statistics/usr`;

    axios.get(uri).then(res => {
      statistics = res.data;
      dispatch(setStatisticsData(statistics));
    });
  };
}

export function setStatisticsData(statistics) {
  return {
    type: SET_STATISTICS_DATA,
    statistics
  };
}
