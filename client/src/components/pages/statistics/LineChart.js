import React, { Component } from "react";
import {Line} from 'react-chartjs-2';

class LineChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-12">
        <Line
        height = {50}
          data={{
            labels: this.props.data.labels,
            datasets: [
              {
                label: "Sales",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.props.data.data
              }
            ]
          }}
          options={{
            title: {
              display: true,
              text: "Sales by count"
            }
          }}
        />
      </div>
    );
  }
}

export default LineChart;
