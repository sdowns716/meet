import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import "./nprogress.css";
import EventGenre from './EventGenre';
import { OfflineAlert } from "./Alert";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

Sentry.init({
  dsn: "https://296f8918647445f094990a0395e2f162@o561027.ingest.sentry.io/5697434",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

class App extends Component {
  state = {
    events: [],
    locations: [],
    NumberOfEvents: 32,
    currentLocation: "all",
    alertText: "",
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
  }
  
  getData = () => {
    console.log('before');
    console.log(this.state);
    //console.log('This prints a message in CloudWatch prefixed with INFO');
    //console.warn('This prints a message in CloudWatch prefixed with WARN');
    //console.error('This prints a message in CloudWatch prefixed with ERROR');
    const {locations, events} = this.state;
    console.log('middle');
    console.log(locations);
    console.log(events);
    const data = locations.map((location)=>{
      console.log('loop');
      console.log(location);
      const number = events.filter((event) => event.location === location).length
      const city = location.split(' ').shift()
      return {city, number};
    })
    return data;
  };

  componentDidMount() {
    this.mounted = true;
    if (!navigator.onLine){
      this.setState({
        offlineAlert: 'You are offline. Data has been loaded from the cache.'
      });
    }
    getEvents().then((events) => {
    if (this.mounted){
      this.setState({
        OfflineAlert: 'You are offline.',
        events: events,
        locations: extractLocations(events)
      });
    }
  });
}

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <h1>Meet-Us</h1>
        <OfflineAlert text={this.state.alertText} />
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateEvents={this.updateEvents}
        />
      <EventList events={this.state.events} />
        <div className="data-vis-wrapper">
        <EventGenre
          locations={this.state.locations}
          events={this.state.events}
        />
        <h4>Events in each city</h4>
        <ResponsiveContainer height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="city" />
            <YAxis
              type="number"
              dataKey="number"
              name="number of events"
              allowDecimals={false}
            />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
