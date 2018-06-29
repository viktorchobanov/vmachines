import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <h3>Машина 
            <span>{this.props.machineID}</span>
        </h3>
      </div>
    );
  }
}

export default Header;
