import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import axios from 'axios';
import jwt from 'jsonwebtoken';

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

class UserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: ''
    }

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
    var username = jwt.decode(localStorage.getItem('jwtToken')).username;

    axios.put('http://localhost:4000/api/user', {
      username: username,
      oldPassword: self.state.oldPassword,
      newPassword: self.state.newPassword
    })
      .then((res) => {
        self.props.toggleUserModal();
      })
      .catch((err) => {
        console.log('Error changing password!');
      });
  }

  updateInput(e, field) {
    this.state[field] = e.target.value;
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.showUserModal}
          onAfterOpen={this.afterOpenModal}
          style={customStyles}
          contentLabel="Change Password"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Смяна на парола</h2>
          <form onSubmit={this.onSubmit}>
            Стара парола: <br />
            <input onChange={(e) => { this.updateInput(e, 'oldPassword') }} className="form-control" type="password" name="passwordOld" required /><br />
            Парола: <br />
            <input onChange={(e) => { this.updateInput(e, 'newPassword') }} className="form-control" type="password" name="password" required /><br />
            Парола отново: <br />
            <input onChange={(e) => { this.updateInput(e, 'newPasswordAgain') }} className="form-control" type="password" name="passwordAgain" required /><br />
            <button className="btn btn-primary panel-button password-btn" onClick={this.changePassword}>
              Смяна на парола
        </button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default connect(null)(UserModal);
