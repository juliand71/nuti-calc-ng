import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { roundToHundredth } from '../constants';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  public sex: 'male' | 'female';
  public age: number;

  private _heightIN: number;
  private _heightCM: number;
  private _weightKG: number;
  private _weightLB: number;
  public pal: number;

  constructor() {
    this.sex = 'male';
    this.age = 25;
    this._heightCM = 182.8;
    this._heightIN = 72;
    this._weightKG = 81.6;
    this._weightLB = 180;
    this.pal = 1.2;
  }

  get heightIN() {
    return this._heightIN;
  }

  set heightIN(ins: number) {
    this._heightIN = ins;
    this._heightCM = roundToHundredth(ins * 2.54);
  }

  get heightCM() {
    return this._heightCM;
  }

  set heightCM(cm: number) {
    this._heightCM = cm;
    this._heightIN = roundToHundredth(cm / 2.54);
  }

  get weightKG() {
    return this._weightKG;
  }

  set weightKG(kg: number) {
    this._weightKG = kg;
    this._weightLB = roundToHundredth(kg * 2.2);
  }

  get weightLB() {
    return this._weightLB;
  }

  set weightLB(lbs: any) {
    this._weightLB = lbs;
    this._weightKG = roundToHundredth(lbs / 2.2);
  }

  get bmi(): number {
    // convert height to meters
    const heightM = this._heightCM / 100;
    return roundToHundredth(this._weightKG / (heightM * heightM));
  }

  get mifflin(): number {
    let mifflin = 0;
    if (this.sex === 'male') {
      mifflin = 10 * this._weightKG + 6.25 * this._heightCM - 5 * this.age + 5;
    } else {
      mifflin =
        10 * this._weightKG + 6.25 * this._heightCM - 5 * this.age - 161;
    }
    return roundToHundredth(mifflin);
  }

  getPatientObject(): Patient {
    return new Patient({
      age: this.age,
      sex: this.sex,
      heightCM: this.heightCM,
      heightIN: this.heightIN,
      weightKG: this.weightKG,
      weightLB: this.weightLB,
      pal: this.pal,
    });
  }
}
