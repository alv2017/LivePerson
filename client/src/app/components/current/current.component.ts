import { Component, OnInit, Input } from '@angular/core';
import { InputData, CurrentData } from 'src/app/data.structures';

@Component({
    selector: 'app-current',
    templateUrl: './current.component.html',
    styleUrls: ['./current.component.css']
})

export class CurrentComponent implements OnInit {
    title = 'Current Weather';
    @Input() data: CurrentData;

    constructor() {}

    ngOnInit() {}
}
