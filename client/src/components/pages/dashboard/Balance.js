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
                        Balance:
                    </h3>
                </div>
                Income: {Math.round(this.props.income * 100) /100} BGN<br />
                Expenses: {this.props.expenses.rent} BGN<br />
                Profit: {Math.round((this.props.income - this.props.expenses.rent) * 100) /100} BGN<br />
            </div>
        );
    }
}

export default Balance;
