import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />);
  });

  test("render the NumberOfEvents component", () => {
    expect(NumberOfEventsWrapper).toHaveLength(1);
  });

  test("render NumberOfEvents textbox element", () => {
    expect(NumberOfEventsWrapper.find(".numberOfEvents")).toHaveLength(1);
  });

  test("number of events textbox is rendered correctly", () => {
    expect(NumberOfEventsWrapper.find(".numberOfEvents input")).toHaveLength(1);
  });

  test("check default value of number of events", () => {
    expect(
      NumberOfEventsWrapper.find(".numberOfEvents input").prop("value")
    ).toBe(32);
  });

  test("check changing the value of number of events", () => {
    NumberOfEventsWrapper.find(".numberOfEvents input").simulate("change", {
      target: { value: 24 },
    });

    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(24);
  });

  test("show number of events input label", () => {
    expect(NumberOfEventsWrapper.find(".numberOfEvents label")).toHaveLength(1);
  });

  test("renders text input correctly", () => {
    const numberOfEvents = NumberOfEventsWrapper.state("numberOfEvents");
    expect(NumberOfEventsWrapper.find(".eventsNumberInput").prop("value")).toBe(
      numberOfEvents
    );
  });
  
  test("change state when text input changes", () => {
    NumberOfEventsWrapper.setState({
      numberOfEvents: "32",
    });
    const eventObject = { target: { value: "10" } };
    NumberOfEventsWrapper.find(".eventsNumberInput").simulate("change", eventObject);
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe("10");
  });
});



