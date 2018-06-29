import React, { Component } from 'react';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import TextFieldGroup from '../../common/TextFieldGroup';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import axios from 'axios';
import jwt from 'jsonwebtoken';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        if (!!this.state.username && !!this.state.password) {
            this.props.login(this.state).then((res) => {
                window.location.href = '/panel';
            });
        }
    }

    updateInput(e, field) {
        this.state[field] = e.target.value;
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <label>
                    <input onChange={(e) => { this.updateInput(e, 'username') }} type="text" required />
                    <div className="label-text">Потребителско име</div>
                </label>
                <label>
                    <input onChange={(e) => { this.updateInput(e, 'password') }} type="password" required />
                    <div className="label-text">Парола</div>
                </label>
                <button>Вход</button><br />
                <button onClick={this.props.toggleModal}>Регистрация</button>
            </form>
        );
    }
}

export default connect(null, { login })(LoginForm);
