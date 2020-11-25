import React from 'react';
import { shallow } from 'enzyme';

import Event from '../Event';

describe('<Event /> component', () => {
  const event = {
    kind: 'calendar#event',
    etag: '"3181161784712000"',
    id: '4eahs9ghkhrvkld72hogu9ph3e_20200521T140000Z',
    status: 'confirmed',
    htmlLink: 'https://www.google.com/calendar/event?eid=NGVhaHM5Z2hraHJ2a2xkNzJob2d1OXBoM2VfMjAyMDA1MjFUMTQwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20',
    created: '2020-05-19T19:17:46.000Z',
    updated: '2020-05-27T12:01:32.356Z',
    summary: 'Learn JavaScript',
    description: 'Have you wondered how you can ask Google to show you the list of the top ten must-see places in London? And how Google presents you the list? How can you submit the details of an application? Well, JavaScript is doing these. :) \n\nJavascript offers interactivity to a dull, static website. Come, learn JavaScript with us and make those beautiful websites.',
    location: 'London, UK',
    creator: {
      email: 'fullstackwebdev@careerfoundry.com',
      self: true
    },
    organizer: {
      email: 'fullstackwebdev@careerfoundry.com',
      self: true
    },
    start: {
      dateTime: '2020-05-21T16:00:00+02:00',
      timeZone: 'Europe/Berlin'
    },
    end: {
      dateTime: '2020-05-21T17:00:00+02:00',
      timeZone: 'Europe/Berlin'
    },
    recurringEventId: '4eahs9ghkhrvkld72hogu9ph3e',
    originalStartTime: {
      dateTime: '2020-05-21T16:00:00+02:00',
      timeZone: 'Europe/Berlin'
    },
    iCalUID: '4eahs9ghkhrvkld72hogu9ph3e@google.com',
    sequence: 0,
    reminders: {
      useDefault: true
    }
  }

  let EventWrapper;

  beforeAll(() => {
    EventWrapper = shallow(<Event event={event} />);
  });

  test('test that componet is rendered', () => {
    expect(EventWrapper).toHaveLength(1);
  });

  test('test that event wrapping div is rendered', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
  });

  test('test that event wrapping div just shows event__Overview', () => {
    expect(EventWrapper.find('.event').children()).toHaveLength(1);
  });

  test('test that event__Overview is rendered', () => {
    expect(EventWrapper.find('.event__Overview')).toHaveLength(1);
  });

  test('test that event__Overview children are rendered', () => {
    expect(EventWrapper.find('.event__Overview').children()).toHaveLength(3);
  });

  test('test that event__Details children are rendered', () => {
    EventWrapper.setState({
      showDetails: true
    });
    expect(EventWrapper.find('.event__Details--description')).toHaveLength(1);
  });

  test('test that show/hide details button is rendered', () => {
    expect(EventWrapper.find('.event__Overview button')).toHaveLength(1);
  });

  test('click on button should show details', () => {
    EventWrapper.setState({
      showDetails: false
    });
    EventWrapper.find('.event__Overview button').simulate('click');
    expect(EventWrapper.state('showDetails')).toBe(true);
  });

 
});