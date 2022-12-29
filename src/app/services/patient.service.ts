import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor() {}

  private _patient: BehaviorSubject<Patient> = new BehaviorSubject<Patient>(
    new Patient({
      gender: 'male',
      height: 72,
      weight: 180,
      unit: 'standard',
      age: 25,
      pal: 1.5,
    })
  );

  get value(): Patient {
    return this._patient.value;
  }

  get patient(): Observable<Patient> {
    return this._patient.asObservable();
  }

  switchUnits() {
    const oldPatient = this._patient.value;
    this._patient.next(new Patient(oldPatient, true));
  }

  set gender(g: 'male' | 'female') {
    const oldPatient = this._patient.value;
    oldPatient.gender = g;
    this._patient.next(new Patient(oldPatient));
  }

  set age(a: number) {
    const oldPatient = this._patient.value;
    oldPatient.age = a;
    this._patient.next(new Patient(oldPatient));
  }

  set weight(w: number) {
    const oldPatient = this._patient.value;
    oldPatient.weight = w;
    this._patient.next(new Patient(oldPatient));
  }

  set height(h: number) {
    const oldPatient = this._patient.value;
    oldPatient.height = h;
    this._patient.next(new Patient(oldPatient));
  }

  set pal(p: number) {
    const oldPatient = this._patient.value;
    oldPatient.pal = p;
    this._patient.next(new Patient(oldPatient));
  }

  get bmi(): number {
    let patient = this._patient.value;
    if (patient.unit === 'standard') {
      patient = new Patient(patient, true);
    }
    // convert height to meters
    const heightM = patient.height / 100;
    return patient.weight / (heightM * heightM);
  }

  get mifflin(): number {
    let patient = this._patient.value;
    if (patient.unit === 'standard') {
      patient = new Patient(patient, true);
    }
    if (patient.gender === 'male') {
      return 10 * patient.weight + 6.25 * patient.height - 5 * patient.age + 5;
    } else {
      return (
        10 * patient.weight + 6.25 * patient.height - 5 * patient.age - 161
      );
    }
  }
}
