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
                    <span className="glyphicon glyphicon-plus"></span> Добави разход
                    </button>
                <br />
                <br />
                Наем: {this.props.expenses.rent || 0} лв<br />
                Електричество: {this.props.expenses.electricity || 0} лв<br />
                Други: {this.props.expenses.others || 0} лв<br />
            </div>
        );
    }
}

export default ExpenseList;
