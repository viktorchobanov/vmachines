import React, { Component } from 'react';

class MachineMessage extends Component {
  render() {
    return (
        <span className={this.props.type}>
            {this.props.message}
        </span>
    );
  }
}

export default MachineMessage;
