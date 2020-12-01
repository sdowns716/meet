import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  state = { 
    numberOfEvents: 32 
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.props.updateEvents(null, value);
    this.setState({
      numberOfEvents: value,
    });

    if (value < 1) {
      this.setState({
        infoText: "Please choose a number of events between 1 and 32",
      });
    } else {
      this.setState({
        infoText: "",
      });
    }
  };

  render() {
    return (
      <div className="numberOfEvents">
        <ErrorAlert text={this.state.infoText} />
        <label>Number of Events: </label>
        <input
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
          className="eventsNumberInput"
        />
      </div>
    );
  }
}

export default NumberOfEvents;