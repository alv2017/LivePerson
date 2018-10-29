Now there are two parts of the assignment: the server side and the client side

Client

The client app is contained in the folder called public.
The client source code is contained in the folder called client.

I used Angular and Bootstrap on the client side.

Server 

The server has two data endpoints

1) Current Weather Endpoint: It is used to get current weather data in a particular city. 
User needs to provide 2 request parameters: city name and country code 

Example:
http://localhost:3000/data/weather/current/London/UK


2) Forecast Endpoint: It works pretty much the same as the current weather endpoint

Example:
http://localhost:3000/data/weather/forecast/London/UK

I used Node.js and Express.js on the server side



