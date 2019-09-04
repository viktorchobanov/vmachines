import React, { Component } from 'react';
import Machine from './Machine';

class MachineList extends Component {
    constructor(props) {
        super(props);
    }

    machinePlace(machine) {
        return {
            city: machine.city,
            state: machine.state,
            street: machine.street
        }
    }

    render() {
        return (
            <div className="panel panel-info panel-machine">
                <div className="panel panel-info item-machine">
                    <button className="btn btn-primary panel-button machine-btn" onClick={this.props.toggleMachineModal}>
                        <span className="glyphicon glyphicon-plus"></span> Add Machine
                </button>

                    {this.props.machines.map((machine) => {
                        return <Machine key={machine.machineID} machineID={machine.machineID} place={this.machinePlace(machine)} />
                    })}
                </div>
            </div>
        );
    }
}

export default MachineList;
