import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

  defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
     let AppWrapper;
      given('the user selected an event', () => {
        AppWrapper = mount(<App />);
      });
      when('user is viewing the event', () => {
        AppWrapper.update();
        expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
      });  
  
      then('the event element is collapsed by default', () => {
        expect(AppWrapper.find('showDetails')).toHaveLength(0);
      });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
     let AppWrapper;
      given('the user expands an event', () => {
        AppWrapper = mount (<App />);
      });
      when('the user is viewing the event details', () => {
        AppWrapper.update();
        expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
      });
  
      then('the user will be able to view the event details', () => {
        AppWrapper.find('.event .details-btn').at(0).simulate('click');
  });
    });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
     let AppWrapper;
    given('the user no longer wants to see an events details', () => {
      AppWrapper = mount (<App />);
    });
    when('the user collapses an event', () => {
      AppWrapper.update();
      AppWrapper.find(".event .details-btn").at(0).simulate("click");
    });

    then('the user will no longer see the events details', () => {
      expect(AppWrapper.find(".event .event-details")).toHaveLength(0);
    });
    });
  });
