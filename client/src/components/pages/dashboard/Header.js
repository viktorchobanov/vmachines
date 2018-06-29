import React, { Component } from 'react';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header-item">
                <h2 className="title">
                    <b>
                        Главен Панел
                    </b>
                    <button className="btn btn-default logout" onClick={this.props.logout}>
                        <span>Изход</span>
                    </button>
                    <button className="btn btn-info logout password-btn" onClick={this.props.toggleUserModal}>
                        <span>Смени парола</span>
                    </button>
                </h2>
            </div>
        );
    }
}

export default Header;
