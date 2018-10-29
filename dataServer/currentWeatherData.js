var express = require('express')
var router = express.Router()
var request = require('request');

var weatherAPI = require('./weatherAPI');
var apiOptions = weatherAPI.setOptions('current');

// current weather service
router.get('/weather/current/:city/:country', function (req, res) {
    let city = req.params.city;
    let country = req.params.country;

    //Definition of Response Data Structure
    let data = {
        responseCode : null,
        message: null,
        timeStamp : null,
        name: null,
        country: null,
        weather : {}
    };

    //API query
    apiOptions.qs.q = city.trim() + "," + country.trim();

    //Request to Open Weather API
    var req = request(apiOptions, function (error, response, body) {
        if(response && body) {
            console.log('Current Weather Update Request:', response.statusCode); 
            //convert response string to JSON
            let bodyJSON = JSON.parse(body);

            //transform received json data to specified data structure
            if (response.statusCode == 200) {
                data['responseCode'] = bodyJSON.cod;
                data['message'] = bodyJSON.sys.message;
                data['timeStamp'] = bodyJSON.dt;                 
                data['name'] = bodyJSON.name;
                data['country'] = bodyJSON.sys.country;
                
                
                data.weather['main'] = bodyJSON.weather[0].main;
                data.weather['description'] = bodyJSON.weather[0].description;
                data.weather['temp'] = bodyJSON.main.temp;
                data.weather['pressure'] = bodyJSON.main.pressure;
                data.weather['humidity'] = bodyJSON.main.humidity;
                data.weather['wind'] = bodyJSON.wind.speed;
            }
            else {
                data['responseCode'] = bodyJSON.cod;
                data['message'] = bodyJSON.message;
                data['name'] = city;
                data['country'] = country;
            }
            //send data to client
            res.json(data);
            res.end();
        }
        else {
            console.log('error:', error); // Print the error if one occurred
            res.send('There was a problem with the request. An unexpected error has occurred.')
            res.end()
        }         
    });
})


module.exports = router