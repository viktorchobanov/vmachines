import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '40vw',
    height: '100vh',
    marginRight: '-30%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#333333'
  }
};

Modal.setAppElement('#root')

class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: {
        username: '',
        password: '',
        passwordAgain: '',
        email: ''
      }
    }

    this.updateInput = this.updateInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    var self = this;
    
    if(self.validateInput()){
      axios.post(' /api/user', self.state.newUser)
      .then((res) => {
        self.props.toggleModal();
      })
      .catch((err) => {
        console.log('Error registering!');
      });
    }
  }

  updateInput(e, field) {
    this.state.newUser[field] = e.target.value;
  }

  validateInput() {
    var isValid = false;

    if(
      this.state.newUser.username != '' &&
      this.state.newUser.password != '' &&
      this.state.newUser.email != '' &&
      this.state.newUser.password == this.state.newUser.passwordAgain
    ) {
      isValid = true;
    }

    return isValid;
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.registerModalOpen}
          onRequestClose={this.props.toggleModal}
          style={customStyles}
          contentLabel="Register"
        >

          <form onSubmit={this.onSubmit}>
            <label>
              <input onChange={(e) => {this.updateInput(e, 'username')}} type="text" required />
              <div className="label-text">Потребителско име</div>
            </label>
            <label>
              <input onChange={(e) => {this.updateInput(e, 'password')}} type="password" required />
              <div className="label-text">Парола</div>
            </label>
            <label>
              <input onChange={(e) => {this.updateInput(e, 'passwordAgain')}} type="password" required />
              <div className="label-text">Парола отново</div>
            </label>
            <label>
              <input onChange={(e) => {this.updateInput(e, 'email')}} type="text" required />
              <div className="label-text">e-mail</div>
            </label>
            <button onClick={this.registerUser}>Регистрация</button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default UserModal;
