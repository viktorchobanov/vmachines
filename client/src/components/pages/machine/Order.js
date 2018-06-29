import React, { Component } from 'react';

class Order extends Component {
  render() {
    return (
      <div className="panel panel-default item-machine item-machine-element">
        Машина - {this.props.machineID}<br />
        Продукт - {this.props.product}
      </div>
    );
  }
}

export default Order;
