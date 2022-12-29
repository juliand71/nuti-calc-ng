import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css'],
})
export class PatientFormComponent implements OnInit {
  constructor(protected patientService: PatientService) {
    this.patient = this.patientService.value;
  }

  ngOnInit(): void {
    this.patientService.patient.subscribe((pt) => {
      this.patient = pt;

      this.unitControl.setValue(this.patient.unit, { emitEvent: false });
      this.genderControl.setValue(this.patient.gender, {
        emitEvent: false,
      });
      this.ageControl.setValue(this.patient.age, { emitEvent: false });
      this.weightControl.setValue(this.patient.weight, {
        emitEvent: false,
      });
      if (this.patient.unit === 'standard') {
        this.weightUnit = 'lbs';
        this.heightUnit1 = 'ft';
        this.heightUnit2 = 'in';
        const feet = Math.floor(this.patient.height / 12);
        const inches = this.patient.height - feet * 12;
        this.heightControl1.setValue(feet, { emitEvent: false });
        this.heightControl2.setValue(inches, { emitEvent: false });
      } else {
        this.weightUnit = 'kg';
        this.heightUnit1 = 'm';
        this.heightUnit2 = 'cm';
        const meters = Math.floor(this.patient.height / 100);
        const cm = this.patient.height - meters * 100;
        this.heightControl1.setValue(meters, { emitEvent: false });
        this.heightControl2.setValue(cm, { emitEvent: false });
      }
      this.palControl.setValue(this.patient.pal, { emitEvent: false });
    });

    this.unitControl.valueChanges.subscribe((value) => {
      if (value !== this.patient.unit) {
        this.patientService.switchUnits();
      }
    });
    this.genderControl.valueChanges.subscribe((value) => {
      this.patientService.gender = value;
    });
    this.ageControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.patientService.age = value;
      });
    this.weightControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.patientService.weight = value;
      });
    this.heightControl1.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        if (this.patient.unit === 'standard') {
          const inches = value * 12 + this.heightControl2.value;
          this.patientService.height = inches;
        } else {
          const cm = value * 100 + this.heightControl2.value;
          this.patientService.height = cm;
        }
      });
    this.heightControl2.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
                if (this.patient.unit === 'standard') {
                  const inches = value + this.heightControl1.value * 12;
                  this.patientService.height = inches;
                } else {
                  const cm = value + this.heightControl1.value * 100;
                  this.patientService.height = cm;
                }
      });
    this.palControl.valueChanges
      .subscribe((value) => {
        this.patientService.pal = value;
      });
  }

  patient: Patient;

  unitControl: FormControl = new FormControl('standard');
  genderControl: FormControl = new FormControl('male');
  ageControl: FormControl = new FormControl(25);
  weightControl: FormControl = new FormControl(180);
  heightControl1: FormControl = new FormControl(6);
  heightControl2: FormControl = new FormControl(0);
  palControl: FormControl = new FormControl(1.5);

  weightUnit: 'kg' | 'lbs' = 'lbs';
  heightUnit1: 'ft' | 'm' = 'ft';
  heightUnit2: 'in' | 'cm' = 'in';
}
