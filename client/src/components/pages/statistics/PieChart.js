import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class PieChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-6">
        <Pie
          data={{
            labels: this.props.data.labels,
            datasets: [
              {
                data: this.props.data.data,
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "blue",
                  "green",
                  "black"
                ]
              }
            ]
          }}
          options={{
            title: {
              display: true,
              text: "Product Share"
            }
          }}
        />
      </div>
    );
  }
}

export default PieChart;
