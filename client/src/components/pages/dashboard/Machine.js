import React, { Component } from 'react';
import axios from 'axios';

class Machine extends Component {
  constructor(props) {
    super(props);

    this.deleteMachine = this.deleteMachine.bind(this);
  }

  deleteMachine() {
    var self = this;

    axios.delete(` /api/machine/${self.props.machineID}`)
    .then((res) => {
      console.log('Deleted!')
    })
    .catch((err) => {
      console.log('Not deleted!');
    });
  }

  render() {
    return (
      <div className="panel panel-default item-machine item-machine-element">
        <a href={`/machine/${this.props.machineID}`}>
          <div>
            Name: Vending {this.props.machineID}
            <br />
            Place: {`${this.props.place.city}, ${this.props.place.state}, ${this.props.place.street}`}
          </div>
        </a>

        <button className="btn btn-danger" onClick={this.deleteMachine}>Delete</button>
      </div>
    );
  }
}

export default Machine;
