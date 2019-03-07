const up = 'up';
const down = 'down';

function ElevatorSystem() {
  // 1 is basement 2 is parter, so to  get the floor number in the building you need to add 2
  this.numberOfFloors = 12;
  this.elevators = { 
                     "A" : {  allowedFloors:[1,2,3,4,5,6,7,8,9,10,11],
                              destinationFloor : 0,
                              destinationQueue : [],
                              currentDirection : up,
                              currentFloor : 1,                      
                              label : "A",                      
                     },
                    "B" : {   allowedFloors:[2,3,4,5,6,7,8,9,10,11,12],
                              destinationFloor : 5,
                              destinationQueue : [],
                              currentDirection : up,
                              currentFloor : 4,
                              label : "B",
                    },
                  };

  this.goto = (destinationFloor) => {
      console.log('New request for: ', destinationFloor);
      // Ensure it is a valid floor
      if ( !isInBoundries(destinationFloor, 1, this.numberOfFloors)) {
        console.log(`Non existing floor: ${destinationFloor}`);
        return;
      }

      // Special cases
      if ( !canGoTo(destinationFloor, this.elevators.A)) {
        this.queue(this.elevators.B, destinationFloor);
      }

      if ( !canGoTo(destinationFloor, this.elevators.B)) {
        this.queue(this.elevators.A, destinationFloor);
      }

      // Calcualte shorter distance, between both elevators
      const distanceFromA = this.countDistance( this.elevators.A, destinationFloor );
      const distanceFromB = this.countDistance( this.elevators.B, destinationFloor );

      if ( distanceFromA > distanceFromB) {
        this.queue(this.elevators.B, destinationFloor);
      } else {
        this.queue(this.elevators.A, destinationFloor);
      }
  }

  this.queue = (elevator, destinationFloor) => {
    let destinationDirection = this.calculateDirection(elevator, destinationFloor); 
    let isElevatorEmpty = this.destinationFloor === null || this.destinationFloor === undefined;
    let isSameDestinationBeforeCurrDest = destinationFloor < this.destinationFloor && destinationDirection === this.currentDirection 
    let isSameDirectionAfterCurrDest = destinationFloor > this.destinationFloor && destinationDirection === this.currentDirection 
    if (isElevatorEmpty) {
      console.log('Starting floor');
      elevator.destinationFloor = destinationFloor;
      elevator.currentDirection = destinationDirection;
    } else if (isSameDirectionAfterCurrDest) { // Elevator has destination
      console.log('Picking up someone!');
      elevator.destinationQueue.push(this.destinationFloor);
      elevator.destinationFloor = destinationFloor;
    } else if (isSameDirectionAfterCurrDest) {
      console.log(`Going to pick from${destinationFloor} since it is in same direction ${this.currentFloor}`);
      elevator.destinationQueue.push(destinationFloor);
    } else {
      // Is in different direction
      console.log(`Someone on floor ${destinationFloor} made a request, putting in queue since it is below current floor ${this.currentFloor}`);
      elevator.destinationQueue.push(destinationFloor);
    }

  }

  this.countDistance = (elevator, destinationFloor) => {
    // calc distance going up
    let distance;
    if ( elevator.currentDirection === up && destinationFloor > elevator.currentFloor ) {
      distance = destinationFloor - elevator.currentFloor;
    }

    // cal distance going down
    if ( elevator.currentDirection === down && destinationFloor < elevator.currentFloor ) {
      distance = elevator.currentFloor - destinationFloor;
    }

    // calc distance going up, but direction is down
    if ( elevator.currentDirection === up && destinationFloor < elevator.currentFloor ) {
      distance = ( elevator.destinationFloor - elevator.currentFloor) + (elevator.destinationFloor - destinationFloor);
    }

    if ( elevator.currentDirection === down && destinationFloor > elevator.currentFloor ) {
      distance = ( elevator.currentFloor - elevator.destinationFloor) + (destinationFloor - elevator.destinationFloor);
    }

    distance = Math.abs(distance); // distance is always positive
    console.log(`Label: ${elevator.label}, destinationFloor: ${elevator.destinationFloor}, currentFloor: ${elevator.currentFloor} destinationFloor: ${destinationFloor}, sdistance: ${distance}`);
    return distance;
  }

  this.travel = () => {
    this.elevatorTravel(this.elevators.A);
    this.elevatorTravel(this.elevators.B);
  }

  this.elevatorTravel = (elevator) => {
    if (elevator.destinationFloor === undefined || elevator.destinationFloor === null ) {
      return;
    }

    elevator.currentDirection === up ? elevator.currentFloor++ : elevator.currentFloor--;
    console.log(`Move elevator ${elevator.label} to ${elevator.currentFloor} destination: ${elevator.destinationFloor}`);
    if ( elevator.currentFloor === elevator.destinationFloor) {
      console.log(`Elevator: ${elevator.label} Open doors`);
      // elevator doors close automatically after some seconds
      console.log(`Elevator: ${elevator.label} Close doors`);
      elevator.destinationFloor = undefined;
      let destinationFloor = elevator.destinationQueue.shift();
      if (destinationFloor != undefined ) {
        elevator.currentDirection = this.calculateDirection(elevator, destinationFloor);
        elevator.destinationFloor = destinationFloor;
        console.log(`New destination: ${elevator.destinationFloor} Direction: ${elevator.currentDirection}`);
      } else {
        // console.log(`Elevator ${elevator.label} waiting for request`);
      }
    }
  }

  function isInBoundries(test, startBoundry, endBoundry) {
    return test >= startBoundry && test <= endBoundry;
  }

  function canGoTo(test, elevator) {
    return test >= elevator.allowedFloors[0] && test <= elevator.allowedFloors[  elevator.allowedFloors.length -1];
  }

  this.calculateDirection = (elevator, destinationFloor) => {
    return elevator.currentFloor - destinationFloor > 0 ? down : up; 
  }
}

const buildingElevators = new ElevatorSystem();
setInterval(buildingElevators.travel, 1000);
buildingElevators.goto(3);
buildingElevators.goto(7);
setTimeout( () => {buildingElevators.goto(9)}, 2000);
setTimeout( () => {buildingElevators.goto(1)}, 2000);
