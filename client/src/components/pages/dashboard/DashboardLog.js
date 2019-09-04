import React, { Component } from 'react';
import MachineMessage from './MachineMessage';

class DashboardLog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel panel-info machine-log container-custom">
                <div className="panel panel-info container-custom">
                    <h3>
                        Notifications:
                </h3>
                </div>

                <div>
                    {this.props.messages.map((message) => {
                        return <div key={Math.random()} className="panel panel-default item-machine item-machine-element">
                            <MachineMessage type="warning" message={message.message} /> <br />
                        </div>
                    })}
                </div>
            </div>
        );
    }
}

export default DashboardLog;
