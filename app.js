var express = require('express');
var fs = require('fs');
var morgan = require('morgan');

//For testing purposed only. This has to be removed
/*
const cors = require('cors')

var corsOptions = {
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
*/

var server = express();
var accessLogStream = fs.createWriteStream('./log/access.log', {flag:'a'});

var currentWeatherPoint = require('./dataServer/currentWeatherData');
var forecastWeatherPoint = require('./dataServer/forecastWeatherData');

const PORT = 3000;

//server.use(cors(corsOptions)) //For testing only
server.use(morgan('tiny'));
server.use(morgan('combined', {stream:accessLogStream}));

//Server is on and working
server.get('/hello', (req, res) => {
    res.status(200).send("Hello From Weather Data Server!");
});

//Current Weather Endpoint: sends json data to the client
server.use('/data', currentWeatherPoint);

//Weather Forecast Endpoint: sends json data to the client
server.use('/data', forecastWeatherPoint);

//Serve public (client)
server.use(express.static('public'));

server.listen(PORT, function(){
    console.log(`Server started on port ${PORT}`);
})