export class Patient {
  gender: 'male'| 'female';
  height: number;
  weight: number;
  age: number;
  pal: number;
  unit: 'metric' | 'standard';

  constructor({
    gender,
    height,
    weight,
    age,
    pal,
    unit,
  }: {
    gender: 'male'| 'female';
    height: number;
    weight: number;
    age: number;
    pal: number;
    unit: 'metric' | 'standard';
  }, switchUnits = false) {
    this.gender = gender;
    this.height = height;
    this.weight = weight;
    this.age = age;
    this.pal = pal;
    this.unit = unit;

    if (switchUnits) {
      if (this.unit === 'standard') {
        this.height = Math.round(this.height * 2.54);
        this.weight = Math.round(this.weight / 2.205);
        this.unit = 'metric';
      } else {
        this.height = Math.round(this.height / 2.54);
        this.weight = Math.round(this.weight * 2.205);
        this.unit = 'standard';
      }
    }
  }
}
