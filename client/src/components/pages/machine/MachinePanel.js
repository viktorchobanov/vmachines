import React, { Component } from 'react';
import Header from './Header';
import ProductList from './ProductList';
import OrdersList from './OrdersList';
import ProductModal from '../../modals/ProductModal';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import '../../../css/machine.css';

class MachinePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      orders: [],
      machineInfo: {
        _id: '',
        machineID: 1,
        products: []
      },
      showProductModal: false
    }

    this.toggleProductModal = this.toggleProductModal.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.isLoggedIn();

    this.loginInterval = setInterval(() => {
      this.isLoggedIn();
      this.getData();
    }, 2000);
  }

  isLoggedIn() {
    if (!localStorage.getItem('jwtToken')) {
      window.location.href = '/login';
    } else if (localStorage.getItem('jwtToken') && !jwt.decode(localStorage.getItem('jwtToken')).username) {
      window.location.href = '/login';
    }
  }

  toggleProductModal() {
    this.setState({
      showProductModal: !this.state.showProductModal
    });
  }

  getData() {
    var self = this;

    const { match: { params } } = this.props;

    var machineID = params.machineID;

    axios
      .get(`/api/machine/${machineID}/info`)
      .then((res) => {
        self.setState({
          machineInfo: res.data
        });

        self.forceUpdate();
      })
      .catch((err) => {
        console.log('Error getting machine info!');
      });

    axios
      .get(`/api/products/${machineID}`)
      .then((res) => {
        self.setState({
          products: res.data
        });

        self.forceUpdate();
      })
      .catch((err) => {
        console.log('Error getting orders!');
      });

    axios
      .get(`/api/orders/machineID/${machineID}`)
      .then((res) => {
        self.setState({
          orders: res.data
        });

        self.forceUpdate();
      })
      .catch((err) => {
        console.log('Error getting orders!');
      });
  }

  render() {
    return (
      <div className="container-machine">
        <Header machineID={this.state.machineInfo.machineID} token={this.state.machineInfo._id} className="container-machine-header" />
        <ProductList products={this.state.products} toggleProductModal={this.toggleProductModal} />
        <OrdersList orders={this.state.orders} className="container-machine-orders" />
        <ProductModal machineID={this.state.machineInfo.machineID} toggleProductModal={this.toggleProductModal} showProductModal={this.state.showProductModal} />
      </div>
    );
  }
}

export default MachinePanel;
