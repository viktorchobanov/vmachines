import React, { Component } from "react";

class Header extends Component {
  render() {
    var base = 'http://localhost:4000';

    return (
      <div className={this.props.className}>
        <h3>
          Machine Dashboard: <span>{this.props.machineID} </span>
          <a href={`${base}/machine/${this.props.machineID}/statistics`} className="btn btn-info">Analytics</a>
        </h3>
        <h4>
          Machine key: <span>{this.props.token}</span>
        </h4>
      </div>
    );
  }
}

export default Header;
