import React, { Component } from 'react';
import axios from 'axios';

class Machine extends Component {
  constructor(props) {
    super(props);

    this.deleteMachine = this.deleteMachine.bind(this);
  }

  deleteMachine() {
    var self = this;

    axios.delete(`http://localhost:4000/api/machine/${self.props.machineID}`)
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
            Машина: Машина {this.props.machineID}
            <br />
            Място: {`${this.props.place.city}, ${this.props.place.state}, ${this.props.place.street}`}
          </div>
        </a>

        <button className="btn btn-danger" onClick={this.deleteMachine}>Изтрий</button>
      </div>
    );
  }
}

export default Machine;
