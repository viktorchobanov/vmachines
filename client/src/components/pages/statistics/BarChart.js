import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="col-md-6" >
        <Bar
          data={{
            labels: this.props.data.labels,
            datasets: [
              {
                label: "Profit in BGN",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: this.props.data.data
              }
            ]
          }}
          options={{
            title: {
              display: true,
              text: "Profit by product"
            }
          }}
        />
      </div>
    );
  }
}

export default BarChart;
