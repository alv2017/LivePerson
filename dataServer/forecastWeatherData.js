var express = require('express')
var router = express.Router()
var request = require('request');

var weatherAPI = require('./weatherAPI');
var apiOptions = weatherAPI.setOptions('forecast');

// current weather service
router.get('/weather/forecast/:city/:country', function (req, res) {
    let city = req.params.city;
    let country = req.params.country;

    //Definition of Response Data Structure
    let data = {
        responseCode : null,
        message: null,
        timeStamp : null,
        name: null,
        country: null,
        forecast : []
    };

    //API query
    apiOptions.qs.q = city.trim() + "," + country.trim();

    //Request to Open Weather API
    var req = request(apiOptions, function (error, response, body) {
        if(response && body) {
            console.log('Weather Forecast Request:', response.statusCode); 
            //convert response string to JSON
            let bodyJSON = JSON.parse(body);

            //transform received json data to specified data structure
            if (response.statusCode == 200) {
                data['responseCode'] = bodyJSON.cod;
                data['message'] = bodyJSON.message;
                data['timeStamp'] = bodyJSON.list[0].dt;
                data['name'] = bodyJSON.city['name'];
                data['country'] = bodyJSON.city['country'];
                
                

                (bodyJSON.list).forEach(function(element) {
                    let forecastItem = {};
                    forecastItem['dt'] = element.dt;
                    forecastItem['main'] = element.weather[0].main;
                    forecastItem['description'] = element.weather[0].description;
                    forecastItem['temp'] = element.main.temp;
                    forecastItem['pressure'] = element.main.pressure;
                    forecastItem['humidity'] = element.main.humidity;
                    forecastItem['wind'] = element.wind.speed;
                    forecastItem['rain'] = element.rain;

                    data.forecast.push(forecastItem);
                });

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