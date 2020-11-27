Feature:  Specify the number of events to view

Scenario: If the user has not specified a number, 32 events will be shown by default
  Given the user did not specify number of events to view
  When the user is viewing the list of events
  Then the default number of events shown is 32

Scenario: User can specify the number of events to be shown 
  Given the user wants to view a specific number of events
  When the user specifies the number of events to be viewed
  Then the specified number of events will be shown.