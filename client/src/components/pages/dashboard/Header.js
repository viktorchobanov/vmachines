import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var base = 'http://localhost:4000';
    var machineID = 1;

    return (
      <div className="header-item">
        <h2 className="title">
          <b>Main Dashboard</b>
          <button
            className="btn btn-default logout"
            onClick={this.props.logout}
          >
            <span>Logout</span>
          </button>
          <button
            className="btn btn-info logout password-btn"
            onClick={this.props.toggleUserModal}
          >
            <span>Change Password</span>
          </button>
          <a
            href={`${base}/machine/${machineID}/statistics`}
            className="btn btn-info logout"
          >
            Analytics
          </a>
        </h2>
      </div>
    );
  }
}

export default Header;
