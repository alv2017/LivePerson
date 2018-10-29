This is a server part of the assignment.


The server has two data endpoints

1) Current Weather Endpoint: It is used to get current weather data in a particular city. 
User needs to provide 2 request parameters: city name and country code 

Example:
http://localhost:3000/data/weather/current/London/UK


2) Forecast Endpoint: It works pretty much the same as the current weather endpoint

Example:
http://localhost:3000/data/weather/forecast/London/UK


Q & A:
1. 
Q: Why do we need to write our own service instead of using the third party API directly.

A: Writing you own data-services for a third party API may be useful in the following situations:

a) We are using a paid/quota API, and we do not want to show our credentials to malicious users;

b) We want to provide a well-structured data to Front-End Developers.

c) We want more stability on the client side. If the API provider decides to change the data structure, we will have to apply changes only on the side, and the client side of the application remains untouched.

d) Finally, in case of quotas we might want to have a control over access to the third party API. It is not applicable to the project's server side code, but it one of the case when we might want to create our own services to the third party API.


