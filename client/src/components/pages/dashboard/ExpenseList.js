import React, { Component } from 'react';

class ExpenseList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel panel-info container-custom">
                <button className="btn btn-primary" onClick={() => {
                    this.props.toggleModal('showExpenseModal')
                }}>
                    <span className="glyphicon glyphicon-plus"></span> Add Expense
                    </button>
                <br />
                <br />
                Rent: {this.props.expenses.rent || 0} BGN<br />
                Electricity: {this.props.expenses.electricity || 0} BGN<br />
                Other: {this.props.expenses.others || 0} BGN<br />
            </div>
        );
    }
}

export default ExpenseList;
