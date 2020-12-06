import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import "./nprogress.css";
import { OfflineAlert } from "./Alert";

class App extends Component {
  state = {
    events: [],
    locations: [],
    NumberOfEvents: 32, 
    currentLocation: "all"
  };

  
  updateEvents = (location, eventCount) => {
    const { currentLocation, numberOfEvents } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location);
        const filteredEvents = locationEvents.slice(0, numberOfEvents);
        this.setState({
          events: filteredEvents,
          currentLocation: location,
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents =
          currentLocation === "all"
            ? events
            : events.filter((event) => event.location === currentLocation);
        const filteredEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: filteredEvents,
          numberOfEvents: eventCount,
        });
      });
    }
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events,
          locations: extractLocations(events),
        });
      }
    });

    window.addEventListener("online", this.offlineAlert());
  }

  offlineAlert = () => {
    if (navigator.onLine === false) {
      this.setState({
        alertText:
          "You are currently offline. Please connect to the internet for an updated list of events",
      });
    } else {
      this.setState({ alertText: "" });
    }
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
         <OfflineAlert text={this.state.alertText} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        <NumberOfEvents
            updateEvents={this.updateEvents}
            numberOfEvents={this.state.numberOfEvents} />
      </div>
    );
  }
}
export default App;