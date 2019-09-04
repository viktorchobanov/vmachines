import React, { Component } from "react";
import Header from "./Header";
import Balance from "./Balance";
import DashboardLog from "./DashboardLog";
import ExpenseList from "./ExpenseList";
import MachineList from "./MachineList";
import ExpenseModal from "../../modals/ExpenseModal";
import MachineModal from "../../modals/MachineModal";
import UserModal from "../../modals/UserModal";
import OrdersList from "../machine/OrdersList";
import { getUser } from "../../utils/user";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { getPanelData } from "../../actions/commonActions";
import jwt from "jsonwebtoken";
import axios from "axios";
import "../../../css/panel.css";

class DashboardPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: "pesho",
      showMachineModal: false,
      showExpenseModal: false,
      showUserModal: false,
      machines: [],
      messages: [],
      orders: [],
      expenses: {
        rent: 0,
        electricity: 0,
        other: 0
      },
      income: 0,
      totalExpenses: 0
    };

    this.toggleExpenseModal = this.toggleExpenseModal.bind(this);
    this.toggleUserModal = this.toggleUserModal.bind(this);
    this.toggleMachineModal = this.toggleMachineModal.bind(this);
  }

  componentWillMount() {
    var owner =
      localStorage.getItem("jwtToken") &&
      jwt.decode(localStorage.getItem("jwtToken")).username;
    this.setState({ owner: owner });

    this.props.getPanelData();
    this.isLoggedIn();
    
    this.loginInterval = setInterval(() => {
      this.isLoggedIn();
      this.props.getPanelData();

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

  toggleExpenseModal() {
    this.setState({
      showExpenseModal: !this.state.showExpenseModal
    });
  }

  toggleMachineModal() {
    this.setState({
      showMachineModal: !this.state.showMachineModal
    });
  }

  toggleUserModal() {
    this.setState({
      showUserModal: !this.state.showUserModal
    });
  }

  componentWillUnmount() {
    clearInterval(this.loginInterval);
  }

  render() {
    var owner = getUser();

    return (
      <div className="container-dashboard">
        <Header
          logout={this.props.logout}
          showUserModal={this.state.showUserModal}
          toggleUserModal={this.toggleUserModal}
        />
        <UserModal
          showUserModal={this.state.showUserModal}
          toggleUserModal={this.toggleUserModal}
        />
        <div className="container-expense">
          <Balance income={this.props.panel.income} expenses={this.props.panel.expenses} />
          <ExpenseList
            expenses={this.props.panel.expenses}
            showExpenseModal={this.state.showExpenseModal}
            toggleModal={this.toggleExpenseModal}
          />
          <ExpenseModal
            owner={owner}
            machines={this.props.panel.machines}
            showExpenseModal={this.state.showExpenseModal}
            toggleModal={this.toggleExpenseModal}
          />
        </div>
        <div className="panel-orders">
          <OrdersList
            orders={this.props.panel.orders}
            className="container-all-orders"
          />
        </div>
        <DashboardLog messages={this.props.panel.messages} />
        <MachineList
          machines={this.props.panel.machines}
          showMachineModal={this.state.showMachineModal}
          toggleMachineModal={this.toggleMachineModal}
        />
        <MachineModal
          owner={owner}
          showMachineModal={this.state.showMachineModal}
          toggleMachineModal={this.toggleMachineModal}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    panel: state.common.panel
  };
};

export default connect(
  mapStateToProps,
  { logout, getPanelData }
)(DashboardPanel);
