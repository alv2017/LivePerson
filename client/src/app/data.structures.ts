export class InputData {
    city: string;
    country: string;
    forecast: boolean;

    constructor(city: string, country: string, forecast: boolean) {
        this.city = city;
        this.country = country;
        this.forecast = forecast;
    }
  }

export class WeatherData {
    description: string;
    temp: number;
    wind: number;
}

export class CurrentData {
    responseCode: number;
    timeStamp: number;
    name: string;
    country: string;
    weather: WeatherData;
}

export class ForecastItem {
    timeStamp: number;
    main: string;
    temp: number;
    wind: number;
}

export class ForecastData {
    responseCode: number;
    timeStamp: number;
    name: string;
    country: string;
    forecast: [];
}
