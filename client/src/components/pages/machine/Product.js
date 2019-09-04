import React, { Component } from 'react';
import axios from 'axios';

class Product extends Component {
  constructor(props) {
    super(props);

    this.deleteProduct = this.deleteProduct.bind(this);
  }

  deleteProduct() {
    var self = this;
    var base = 'http://localhost:4000';

    axios.delete(`${base}/api/product/${this.props.product.name}`)
    .then((res) => {
      console.log('Deleted');
    })
    .catch((err) => {
      console.log('Could not delete product!');
    });
  }

  render() {
    return (
      <div className="panel panel-default item-machine item-machine-element">
        <div onClick={this.props.toggleProductModal}>
        <h4><b>Product Name: {this.props.product.name}</b></h4>
        <ul>
            <li>Quantity: {this.props.product.amount} </li>
            <li>Consumer Price: {this.props.product.price} BGN </li>
            <li>Wholesale price : {this.props.product.cost} BGN </li>
        </ul>
        </div>
        <button className="btn btn-danger" onClick={this.deleteProduct}>Delete</button>
      </div>
    );
  }
}

export default Product;
