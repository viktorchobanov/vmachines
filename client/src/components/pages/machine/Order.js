import React, { Component } from 'react';

class Order extends Component {
  render() {
    return (
      <div className="panel panel-default item-machine item-machine-element">
        Machine - {this.props.machineID}<br />
        Product - {this.props.product}
      </div>
    );
  }
}

export default Order;
