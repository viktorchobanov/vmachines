import React, { Component } from 'react';

class Balance extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel panel-info container-custom">
                <div className="panel panel-info container-custom">
                    <h3>
                        Баланс:
                    </h3>
                </div>
                Приходи: ${Math.round(this.props.income * 100) /100}<br />
                Разходи: ${this.props.expenses.rent} <br />
                Печалба: ${Math.round((this.props.income - this.props.expenses.rent) * 100) /100}<br />
            </div>
        );
    }
}

export default Balance;
