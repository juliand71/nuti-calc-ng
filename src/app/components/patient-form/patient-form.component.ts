import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css'],
})
export class PatientFormComponent implements OnInit {
  genderControl: FormControl;
  ageControl: FormControl;
  weightControlKG: FormControl;
  weightControlLB: FormControl;
  heightControlIN: FormControl;
  heightControlCM: FormControl;
  palControl: FormControl;

  constructor(protected patientService: PatientService) {
    this.genderControl = new FormControl(patientService.sex);
    this.ageControl = new FormControl(patientService.age);
    this.weightControlKG = new FormControl(patientService.weightKG);
    this.weightControlLB = new FormControl(patientService.weightLB);
    this.heightControlCM = new FormControl(patientService.heightCM);
    this.heightControlIN = new FormControl(patientService.heightIN);
    this.palControl = new FormControl(patientService.pal);
  }

  ngOnInit(): void {
    this.genderControl.valueChanges.subscribe((gender) => {
      this.patientService.sex = gender;
    });
    this.ageControl.valueChanges.subscribe((age) => {
      this.patientService.age = age;
    });
    this.weightControlKG.valueChanges.subscribe((kg) => {
      this.patientService.weightKG = kg;
      this.weightControlLB.setValue(this.patientService.weightLB, {
        emitEvent: false,
      });
    });
    this.weightControlLB.valueChanges.subscribe((lbs) => {
      this.patientService.weightLB = lbs;
      this.weightControlKG.setValue(this.patientService.weightKG, {
        emitEvent: false,
      });
    });
    this.heightControlCM.valueChanges.subscribe((cm) => {
      this.patientService.heightCM = cm;
      this.heightControlIN.setValue(this.patientService.heightIN, {
        emitEvent: false,
      });
    });
    this.heightControlIN.valueChanges.subscribe((ins) => {
      this.patientService.heightIN = ins;
      this.heightControlCM.setValue(this.patientService.heightCM, {
        emitEvent: false,
      });
    });
    this.palControl.valueChanges.subscribe((pal) => {
      this.patientService.pal = pal;
    });
  }
}
