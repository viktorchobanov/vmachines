import React, { Component } from "react";
import Header from "./Header";
import ProductList from "./ProductList";
import OrdersList from "./OrdersList";
import ProductModal from "../../modals/ProductModal";
import { getMachineData } from "../../actions/commonActions";
import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import axios from "axios";
import "../../../css/machine.css";

class MachinePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      orders: [],
      machineInfo: {
        _id: "",
        machineID: 1,
        products: []
      },
      showProductModal: false,
      machineID: 0
    };

    this.toggleProductModal = this.toggleProductModal.bind(this);
  }

  componentWillMount() {
    const {
      match: { params }
    } = this.props;

    var machineID = params.machineID;
    this.setState({ machineID: machineID });

    this.props.getMachineData(machineID);
    this.isLoggedIn();

    this.loginInterval = setInterval(() => {
      this.isLoggedIn();
    }, 2000);
  }

  isLoggedIn() {
    if (!localStorage.getItem("jwtToken")) {
      window.location.href = "/login";
    } else if (
      localStorage.getItem("jwtToken") &&
      !jwt.decode(localStorage.getItem("jwtToken")).username
    ) {
      window.location.href = "/login";
    }
  }

  toggleProductModal() {
    this.setState({
      showProductModal: !this.state.showProductModal
    });
  }

  componentWillUnmount() {
    clearInterval(this.loginInterval);
  }

  render() {
    return (
      <div className="container-machine">
        <Header
          machineID={this.props.machine.machineInfo && this.props.machine.machineInfo.machineID}
          token={this.props.machine.machineInfo && this.props.machine.machineInfo._id}
          className="container-machine-header"
        />
        <ProductList
          products={this.props.machine.products || []}
          toggleProductModal={this.toggleProductModal}
        />
        <OrdersList
          orders={this.props.machine.orders || []}
          className="container-machine-orders"
        />
        <ProductModal
          machineID={this.props.machine.machineInfo && this.props.machine.machineInfo.machineID}
          toggleProductModal={this.toggleProductModal}
          showProductModal={this.state.showProductModal}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    machine: state.machine.machines || {}
  };
};

export default connect(
  mapStateToProps,
  { getMachineData }
)(MachinePanel);
