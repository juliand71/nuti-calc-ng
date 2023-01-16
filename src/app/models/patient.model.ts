export interface IPatient {
  sex: 'male' | 'female';
  age: number;

  heightIN: number;
  heightCM: number;
  weightKG: number;
  weightLB: number;
  pal: number;
}

export class Patient implements IPatient {
  sex: 'male' | 'female' = 'male';
  age: number = 25;
  heightIN: number = 182.8;
  heightCM: number = 72;
  weightKG: number = 81.6;
  weightLB: number = 180;
  pal: number = 1.2;

  constructor(data: Partial<IPatient>) {
    Object.assign(this, data);
  }
}