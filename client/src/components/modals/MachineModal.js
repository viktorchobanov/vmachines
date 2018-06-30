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

class MachineModal extends Component {
  constructor() {
    super();
    this.state = {
      newMachine: {
        country: '',
        state: '',
        city: '',
        street: '',
        type: '',
        username: 'test',
      }
    }

    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#fff';
  }

  onSubmit(e) {
    e.preventDefault();
    var self = this;
    
    axios.post(' /api/machine', this.state.newMachine)
    .then((res) => {
      self.props.updateRoot();
      self.props.toggleMachineModal();
    })
    .catch((err) => {
      console.log('Error creating machine!');
    });
  }

  updateInput(e, field) {
    this.state.newMachine[field] = e.target.value;
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.showMachineModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.props.toggleMachineModal}
          style={customStyles}
          contentLabel="Add Machine"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Добави Машина</h2>
          <form onSubmit={this.onSubmit}>
            Държава: <br />
            <input onChange={(e) => {this.updateInput(e, 'country')}} className="form-control" type="text" ref="country" required /><br />
            Град: <br />
            <input onChange={(e) => {this.updateInput(e, 'city')}} className="form-control" type="text" name="city" required /><br />
            Квартал: <br />
            <input onChange={(e) => {this.updateInput(e, 'state')}} className="form-control" type="text" name="state" required /><br />
            Улица: <br />
            <input onChange={(e) => {this.updateInput(e, 'street')}} className="form-control" type="text" name="street" required /><br />
            Вид Машина: <br />
            <input onChange={(e) => {this.updateInput(e, 'type')}} className="form-control" type="text" name="type" required /><br />
            <button className="btn btn-primary panel-button machine-modal-btn" onClick={this.registerMachine}>
              <span className="glyphicon glyphicon-plus"></span> Добави Машина
                </button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default MachineModal;
