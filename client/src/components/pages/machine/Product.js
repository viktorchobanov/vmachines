import React, { Component } from 'react';
import axios from 'axios';

class Product extends Component {
  constructor(props) {
    super(props);

    this.deleteProduct = this.deleteProduct.bind(this);
  }

  deleteProduct() {
    var self = this;

    axios.delete(` /api/product/${this.props.product.name}`)
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
        <h4><b>Продукт: {this.props.product.name}</b></h4>
        <ul>
            <li>Количество: {this.props.product.amount}</li>
            <li>Цена: {this.props.product.price} лв </li>
            <li>Цена на зареждане: {this.props.product.cost} лв </li>
        </ul>
        </div>
        <button className="btn btn-danger" onClick={this.deleteProduct}>Изтрий</button>
      </div>
    );
  }
}

export default Product;
