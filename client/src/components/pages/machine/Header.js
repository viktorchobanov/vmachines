import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <h3>Панел Машина <span>{this.props.machineID}</span></h3>
        <h4>Ключ за машината: <span>{this.props.token}</span></h4>
      </div>
    );
  }
}

export default Header;
