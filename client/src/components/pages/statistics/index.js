import React, { Component } from "react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import jwt from "jsonwebtoken";
import { connect } from "react-redux";
import { getStatisticsData } from "../../actions/statisticsActions";

class Statistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  componentDidMount() {
    this.isLoggedIn();

    this.props.getStatisticsData();
    this.loginInterval = setInterval(() => {
      this.isLoggedIn();
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.loginInterval);
  }

  isLoggedIn() {
    if (!localStorage.getItem("jwtToken")) {
      window.location.href = "/login";
    } else if (
      localStorage.getItem("jwtToken") &&
      !jwt.decode(localStorage.getItem("jwtToken")).username
    ) {
      window.location.href = "/login";
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">
          Analytics {"" ? `Machine ${this.props.machineID}` : ""}
        </h1>
        <LineChart data={this.props.statistics.lineChart} />
        <PieChart data={this.props.statistics.pieChart} />
        <BarChart data={this.props.statistics.barChart} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    statistics: state.statistics.statistics || {
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
    }
  };
};

export default connect(
  mapStateToProps,
  { getStatisticsData }
)(Statistics);
