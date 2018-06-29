import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#333',
    color: 'white'
  }
};

Modal.setAppElement('#root')

class ExpenseModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newExpense: {
        type: 'rent',
        amount: '',
        machine: 'all'
      }
    };

    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#fff';
  }

  onSubmit(e) {
    e.preventDefault();
    var self = this;

    axios.post(' /api/expense', self.state.newExpense)
      .then((res) => {
        self.props.toggleModal();
      })
      .catch((err) => {
        console.log('Error creating expense!');
      });
  }

  updateInput(e, field) {
    this.state.newExpense[field] = e.target.value;
  }

  render() {
    return (
      <div onSubmit={this.onSubmit}>
        <Modal
          isOpen={this.props.showExpenseModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Expense"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Добави Разход</h2>
          <form>
            Вид разход: <br />
            <select className="form-control" onChange={(e) => { this.updateInput(e, 'type') }}>
              <option value="rent">Наем</option>
              <option value="electricity">Електричество</option>
              <option value="other">Други</option>
            </select>
            <br />
            Разход: <br />
            <input onChange={(e) => { this.updateInput(e, 'amount') }} className="form-control" type="text" name="amount" required />
            <br />
            Машина: <br />
            <select className="form-control" onChange={(e) => { this.updateInput(e, 'machine') }}>
              <option value="all">Всички машини:</option>
              {
                this.props.machines.map((machine) => {
                  return <option value={machine.machineID}>Машина {machine.machineID}</option>
                })
              }
            </select><br />

            <button className="btn btn-primary panel-button" onClick={this.registerExpense}>
              <span className="glyphicon glyphicon-plus"></span>Добави Разход
                </button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default ExpenseModal;
