import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css'],
})
export class PatientInfoComponent implements OnInit {
  patient: Patient;
  constructor(protected patientService: PatientService) {
    this.patient = this.patientService.value;
  }
  ngOnInit(): void {
    this.patientService.patient.subscribe((pt) => {
      this.patient = pt;
    });
  }
}
