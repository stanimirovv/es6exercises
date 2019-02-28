class Vehicle {
  constructor (make, model, year, weight) {
    this.Make = make;
    this.Year = year;
    this.Model = model;
    this.Weight = weight;
    this.NeedsMaintenance = false;
    this.TripsSinceMaintenence = 0;
    this.isDriving = false;
  }

  Repair() {
    this.TripsSinceMaintenence = 0;
    this.NeedsMaintenance = false;
  }

  Log() {
    console.log(`Make: ${this.Make} Year: ${this.Year} Model: ${this.Model} Weight: ${this.Weight} NeedsMaintenance: ${this.NeedsMaintenance} Trips: ${this.TripsSinceMaintenence}`);
  }

}

class Car extends Vehicle {
  constructor (make, model, year, weight) {
    super(make, model, year, weight);
  }

  Drive() {
    // You can't start driving while you are driving;
    if (!this.isDriving) {
      this.isDriving = true;
    }
  }

  Stop() {
    // can only stop if you are driving
    if (!this.isDriving) {
      return;
    } 
    this.isDriving = false; 
    this.TripsSinceMaintenence++; 
    if (this.TripsSinceMaintenence > 100) {
      this.NeedsMaintenance = true;
    }
  }
}

class Airplane extends Vehicle {
  constructor (make, model, year, weight) {

  }

  Fly() {
    if( this.NeedsMaintenance) {
      console.log("Plain needs meintenance
      return;
    }
    // You can't start driving while you are driving;
    if (!this.isDriving) {
      this.isDriving = true;
    }
  }

  Land() {
    // can only stop if you are driving
    if (!this.isDriving) {
      return;
    } 
    this.isDriving = false; 
    this.TripsSinceMaintenence++; 
    if (this.TripsSinceMaintenence > 100) {
      this.NeedsMaintenance = true;
    }
  }

}

function DriveCar(car) {
  const tripCount = Math.floor(Math.random() * 200);
  for (let i = 0; i < tripCount; i++ ) {
    car.Drive();
    car.Stop();
  }
  console.log(`Car was driven ${tripCount} times`);
  car.Log();
}

let car1 = new Car('make', 'Model 1', 1993, '123123');
let car2 = new Car('make', 'Model 2', 2002, '123123');
let car3 = new Car('make', 'Model 3', 2001, '123123');
DriveCar(car1);
DriveCar(car2);
DriveCar(car3);
