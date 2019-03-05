
const up = 'up';
const down = 'down';

/*
 * Cases:
 *  - elevator is empty  - OK
 *  - is in path of elevator, same direction, can be picked up  - OK
 *  - is in path of elevator, same direction, but after the destination
 *  - is in Path of elevator, but different direction, can be picked up - OK, but needs rework after the second elevator appears
 *  - is in Path of elevator, but different direction, outside of path  - OK
 */

//TODO implement for multiple elevators
function ElevatorSystem(numberOfFloors, elevators) {
  this.numberOfFloors = 12;
  this.currentFloor = 1;
  this.destinationFloor = null;
  this.destinationQueue = [];
  this.currentDirection = null;

  this.elevators = [ 
                    { allowedFloors:[1,2,3,4,5,6,7,8,9,10,11] },
                    { allowedFloors:[2,3,4,5,6,7,8,9,10,11,12] },
                  ];

  this.goto = (destinationFloor) => {

      if ( !isInBoundries(destinationFloor, 1, numberOfFloors)) {
        console.log(`Non existing floor: ${destinationFloor}`);
        return;
      }
    
      let destinationDirection = this.calculateDirection(destinationFloor); 
      // When elevator is empty
      if (this.destinationFloor === null || this.destinationFloor === undefined) {
        console.log('Starting floor');
        this.destinationFloor = destinationFloor;
        this.currentDirection = destinationDirection;
      } else if (destinationFloor < this.destinationFloor && destinationDirection === this.currentDirection ) { // Elevator has destination
        console.log('Picking up someone!');
        this.destinationQueue.push(this.destinationFloor);
        this.destinationFloor = destinationFloor;
      } else if (destinationFloor > this.destinationFloor && destinationDirection === this.currentDirection ){
        console.log(`Goint to pick from${destinationFloor} since it is in same direction ${this.currentFloor}`);
        this.destinationQueue.push(destinationFloor);
      } else {
        // Is in different direction
        console.log(`Someone on floor ${destinationFloor} made a request, putting in queue since it is below current floor ${this.currentFloor}`);
        this.destinationQueue.push(destinationFloor);
      }
  }

  this.travel = () => {
    if (this.destinationFloor === undefined || this.destinationFloor === null ) {
      return;
    }

    this.currentDirection === up ? this.currentFloor++ : this.currentFloor--;
    console.log(`Move elevator to ${this.currentFloor} destination: ${this.destinationFloor}`);
    if ( this.currentFloor === this.destinationFloor) {
      console.log('Open doors');
      // elevator doors close automatically after some seconds
      console.log('Close doors');
      let destinationFloor = this.destinationQueue.shift();
      this.currentDirection = this.calculateDirection(destinationFloor);
      this.destinationFloor = destinationFloor;
      console.log(`New destination: ${this.destinationFloor} Direction: ${this.currentDirection}`);
    }

  }

  function isInBoundries(test, startBoundry, endBoundry) {
    return test >= startBoundry && test <= endBoundry;
  }

  this.calculateDirection = (destinationFloor) => {
    return this.currentFloor - destinationFloor > 0 ? down : up; 
  }


}

const elevators = [
                  ];

// 1 is basement 2 is parter, so to  get the floor number in the building you need to add 2
const buildingElevators = new ElevatorSystem(12, elevators);


buildingElevators.goto(7);
setInterval(buildingElevators.travel, 1000);
setTimeout(() => {buildingElevators.goto(4)}, 2000);
setTimeout(() => {console.log('SSSSSSSSS'); buildingElevators.goto(4)}, 9000);
setTimeout(() => {buildingElevators.goto(2)}, 3000);
