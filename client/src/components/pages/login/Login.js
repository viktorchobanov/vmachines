import React, { Component } from 'react';
import {
    NavLink
  } from "react-router-dom";
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import RegisterUserModal from '../../modals/RegisterUserModal';
import '../../../css/login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerModalOpen: false
        }

        this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
    }

    isLoggedIn(){
        if (jwt.decode(localStorage.getItem('jwtToken')) && jwt.decode(localStorage.getItem('jwtToken')) != undefined){
            // need to add user validation
            window.location.href = '/panel';
        }
    }

    componentWillMount() {
        this.isLoggedIn();
    }

    toggleRegisterModal() {
        this.setState({
            registerModalOpen: !this.state.registerModalOpen
        })
    }

    render(){

        return (
            <div className="login">
                <div className="login-wrap">
                    <LoginForm toggleModal={this.toggleRegisterModal} />
                    <RegisterUserModal registerModalOpen={this.state.registerModalOpen} toggleModal={this.toggleRegisterModal} />
                </div>
            </div>
        );
    }
}

export default Login;
