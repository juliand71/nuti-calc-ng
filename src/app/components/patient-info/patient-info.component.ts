import { Component, OnInit } from '@angular/core';
import { roundToHundredth } from 'src/app/constants';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css'],
})
export class PatientInfoComponent implements OnInit {
  constructor(protected patientService: PatientService) {}
  ngOnInit(): void {}

  getPatient() {
    return this.patientService.getPatientObject();
  }

  getBmi() {
    return this.patientService.bmi;
  }

  getMifflin() {
    return this.patientService.mifflin;
  }

  getMifflinXPal() {
    return roundToHundredth(
      this.patientService.mifflin * this.patientService.pal
    );
  }
}
