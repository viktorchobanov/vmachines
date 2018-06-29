import React, { Component } from 'react';
import Order from './Order';

class OrdersList extends Component {
    render() {
        return (
            <div className={`panel panel-info ${this.props.className}`}>
                <div className="panel panel-info item-machine">
                    <h4>
                        Поръчки:
                    </h4>
                </div>

                {this.props.orders.map((order) => {
                    return <Order id={order._id} machineID={order.machineID} product={order.order && order.order.name} />
                })}
            </div>
        );
    }
}

export default OrdersList;
