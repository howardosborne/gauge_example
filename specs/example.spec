Example form filling in Gauge
=====================

This is an example of the options available for filling in forms.

This file follows markdown syntax.

Every heading in this file denotes a scenario. Every bulleted point denotes a step.

To execute this specification, run
  
  gauge specs

## Happy path test in one line
This is one approach where all the work is done in the step implementations/definitions.
It is the simplest approach and there is plenty of room for desctibing the purpose in markdown
* new user registers through happy path

## Register as new user
This is an example of the same test as 'Happy path test in one line' but each line is explained and makes for a better report.
The data could also be fed in using a table.
As the number of tests grow, it may be good to set up as a [concept](https://docs.gauge.org/writing-specifications.html?os=windows&language=javascript&ide=vscode)  
* click register link
* fill in email field with "justignore@example.com"
* fill in email confirm with "justignore@example.com"
* fill in password field with "justIgnore1!"
* fill in password confirm with "justIgnore1!"
* fill in title field with "Mr"
* fill in first name field with "Bob"
* fill in surname field with "Jones"
* fill in birthday day field with "1"
* fill in birthday month field with "Mar"
* fill in birthday year field with "1964"
* fill in address1 field with "1 High Street"
* fill in country field with "United Kingdom"
* fill in postcode field with "EN12 4PQ"
* check on registration page