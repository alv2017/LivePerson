var express = require('express');
var fs = require('fs');
var morgan = require('morgan');


var server = express();
var accessLogStream = fs.createWriteStream('./log/access.log', {flag:'a'});

var currentWeatherPoint = require('./dataServer/currentWeatherData');
var forecastWeatherPoint = require('./dataServer/forecastWeatherData');

const PORT = 3000;

server.use(morgan('tiny'));
server.use(morgan('combined', {stream:accessLogStream}));

//Server is on and working
server.get('/', (req, res) => {
    res.status(200).send("Hello From Weather Data Server!");
});

//Current Weather Endpoint: sends json data to the client
server.use('/data', currentWeatherPoint);

//Weather Forecast Endpoint: sends json data to the client
server.use('/data', forecastWeatherPoint);

server.listen(PORT, function(){
    console.log(`Server started on port ${PORT}`);
})