import { Component } from '@angular/core';
import { InputData, WeatherData, CurrentData, ForecastItem, ForecastData } from './data.structures';
import { DataService } from './services/data.service';
import { addDay } from './app.functions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'Weather App';
    inputData: InputData;
    currentData: CurrentData;
    forecastData: ForecastData;
    messages = [];

    constructor(private dataService: DataService) {}

    getData(data: InputData): void {

        this.dataService.getCurrent(data)
            .subscribe(response => {
                if (response === undefined) {
                    this.messages.push('An unexpected error has occurred');
                } else {
                    if ( Number(response.responseCode === 200) ) {
                        console.log(response);
                        this.currentData = new CurrentData;
                        this.currentData.responseCode = response.responseCode;
                        this.currentData.timeStamp = response.timeStamp;
                        this.currentData.name = response.name;
                        this.currentData.country = response.country;
                        this.currentData.weather = new WeatherData();
                        this.currentData.weather['description'] = response.weather.description;
                        this.currentData.weather['temp'] = response.weather.temp;
                        this.currentData.weather['wind'] = response.weather.wind;
                    } else {
                        this.messages.push('The data for the selected city was not found');
                    }
                }
            });

        if (data.forecast) {
            this.dataService.getForecast(data)
                .subscribe(response => {
                    this.forecastData = new ForecastData();
                    this.forecastData.responseCode = response.responseCode;
                    this.forecastData.timeStamp = response.timeStamp;
                    this.forecastData.name = response.name;
                    this.forecastData.country = response.country;
                    this.forecastData.forecast = response.forecast.slice(1, 9);
                });
        }
    }

    onInputChange(dataSubmitted: InputData) {
        this.messages = [];
        this.currentData = undefined;
        this.forecastData = undefined;

        this.inputData = dataSubmitted;
        this.getData(this.inputData);
    }
}
