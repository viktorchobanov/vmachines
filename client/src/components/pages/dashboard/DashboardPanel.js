import React, { Component } from 'react';
import Header from './Header';
import Balance from './Balance';
import DashboardLog from './DashboardLog';
import ExpenseList from './ExpenseList';
import MachineList from './MachineList';
import ExpenseModal from '../../modals/ExpenseModal';
import MachineModal from '../../modals/MachineModal';
import UserModal from '../../modals/UserModal';
import OrdersList from '../machine/OrdersList';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import '../../../css/panel.css';

class DashboardPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: 'pesho',
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
    }

    this.toggleExpenseModal = this.toggleExpenseModal.bind(this);
    this.toggleUserModal = this.toggleUserModal.bind(this);
    this.toggleMachineModal = this.toggleMachineModal.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    var owner = localStorage.getItem('jwtToken') && jwt.decode(localStorage.getItem('jwtToken')).username;
    this.setState({ owner: owner });

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

  getData() {
    var self = this;

    axios
      .get(`/api/machines/${self.state.owner}`)
      .then((res) => {
        self.setState({
          machines: res.data
        });

        self.forceUpdate();
      })
      .catch((err) => {
        console.log('Error getting machines!');
      });

    axios
      .get(`/api/orders/${self.state.owner}`)
      .then((res) => {
        self.setState({
          orders: res.data
        });

        self.forceUpdate();
      })
      .catch((err) => {
        console.log('Error getting orders!');
      });

    axios
      .get(`/api/expenses/${self.state.owner}`)
      .then((res) => {
        var totalExpenses = res.data.rent + res.data.electricity + res.data.other;

        self.setState({
          expenses: res.data,
          totalExpenses: totalExpenses
        });

        self.forceUpdate();
      })
      .catch((err) => {
        console.log('Error getting expenses!');
      });

    axios
      .get(`/api/income/${self.state.owner}`)
      .then((res) => {
        self.setState({
          income: res.data.income
        });

        self.forceUpdate();
      })
      .catch((err) => {
        console.log('Error getting income!');
      });

    axios
      .get(`/api/messages/${self.state.owner}`)
      .then((res) => {
        self.setState({
          messages: res.data
        });

        self.forceUpdate();
      })
      .catch((err) => {
        console.log('Error getting messages!');
      });
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
    var owner = localStorage.getItem('jwtToken') && jwt.decode(localStorage.getItem('jwtToken')).username;

    return (
      <div className="container-dashboard">
        <Header logout={this.props.logout} showUserModal={this.state.showUserModal} toggleUserModal={this.toggleUserModal} />
        <UserModal showUserModal={this.state.showUserModal} toggleUserModal={this.toggleUserModal} />
        <div className="container-expense">
          <Balance income={this.state.income} expenses={this.state.expenses} />
          <ExpenseList expenses={this.state.expenses} showExpenseModal={this.state.showExpenseModal} toggleModal={this.toggleExpenseModal} />
          <ExpenseModal owner={owner} machines={this.state.machines} showExpenseModal={this.state.showExpenseModal} toggleModal={this.toggleExpenseModal} />
        </div>
        <div className="panel-orders">
          <OrdersList orders={this.state.orders} className="container-all-orders" />
        </div>
        <DashboardLog messages={this.state.messages} />
        <MachineList machines={this.state.machines} showMachineModal={this.state.showMachineModal} toggleMachineModal={this.toggleMachineModal} />
        <MachineModal owner={owner} showMachineModal={this.state.showMachineModal} toggleMachineModal={this.toggleMachineModal} />
      </div>
    );
  }
}

export default connect(null, { logout })(DashboardPanel);
