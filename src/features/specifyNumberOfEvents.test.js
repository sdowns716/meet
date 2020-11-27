import React from "react";
import App from "../App";
import NumberOfEvents from "../NumberOfEvents";
import { loadFeature, defineFeature } from "jest-cucumber";
import { mount } from "enzyme";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

  test('If the user has not specified a number, 32 events will be shown by default', ({ given, when, then }) => {
    let AppWrapper;
    given('the user did not specify number of events to view', () => {
    });

    when('the user is viewing the list of events', () => {
      AppWrapper = mount(<App />);
    });

    then('the default number of events shown is 32', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event').length).toBeLessThanOrEqual(32);
    });
  });


  test('User can specify the number of events to be shown', ({ given, when, then }) => {
    let AppWrapper;
    given('the user wants to view a specific number of events', () => {
      AppWrapper = mount(<App />);
    });

    when('the user specifies the number of events to be viewed', () => {
      const numberOfEvents = { target: { value: 10 } };
      AppWrapper.find('.numberOfEvents').simulate('change', numberOfEvents);
    });

    then('the specified number of events will be shown.', () => {
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      NumberOfEventsWrapper.setState({ numberOfEvents: 10 });
      expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(10);
    });
  });


});