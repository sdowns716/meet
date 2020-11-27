Feature:  Show and hide event details

Scenario: An event element is collapsed by default
  Given the user selected an event
  When user is viewing the event
  Then the event element is collapsed by default

Scenario:  User can expand an event to see its details
  Given the user expands an event
  When the user is viewing the event details
  Then the user will be able to view the event details

Scenario:  User can collapse an event to hide its details
  Given the user no longer wants to see an events details
  When the user collapses an event
  Then the user will no longer see the events details