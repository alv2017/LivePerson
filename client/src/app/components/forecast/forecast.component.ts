import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { InputData, CurrentData } from 'src/app/data.structures';

@Component({
    selector: 'app-forecast',
    templateUrl: './forecast.component.html',
    styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
    title = '24h Weather Forecast';
    @Input() data: any;

    constructor() { }

    ngOnInit() { }
}
