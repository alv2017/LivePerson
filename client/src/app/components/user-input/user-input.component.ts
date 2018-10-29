import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputData } from '../../data.structures';

@Component({
    selector: 'app-user-input',
    templateUrl: './user-input.component.html',
    styleUrls: ['./user-input.component.css']
})

export class UserInputComponent implements OnInit {
    submitted = false;
    dataForm: FormGroup;
    userData: InputData;
    @Output() inputChanged: EventEmitter<any> = new EventEmitter();

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.dataForm = this.formBuilder.group({
            city: ['', Validators.required],
            country: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
            forecast: [false]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.dataForm.controls; }
    get city() { return this.dataForm.get('city'); }
    get country() { return this.dataForm.get('country'); }
    get forecast() { return this.dataForm.get('forecast'); }


    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.dataForm.invalid) {
            return;
        }
        // proceed otherwise
        this.userData = new InputData(this.city.value, this.country.value, this.forecast.value);
        this.inputChanged.emit(this.userData);
        console.log('User data has been submitted!');
    }
}

