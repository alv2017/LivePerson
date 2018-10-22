
const appid = 'f45b4c44fd05c0f437d6122713bb8459';
const units = 'metric';

function setOptions(opt) {
    if (opt=='current') {
        url = "https://api.openweathermap.org/data/2.5/weather";
    }
    else if (opt=='forecast') {
        url = "https://api.openweathermap.org/data/2.5/forecast";
    }
    let options = {
        uri:url,
        qs: {
            units : units,
            appid :'f45b4c44fd05c0f437d6122713bb8459',
        },
        method: "GET",
        headers: {
            'Accept':'application/json',
            'Accept-Charset':'utf-8'
        }    
    };

    return options;
}

module.exports.setOptions = setOptions;