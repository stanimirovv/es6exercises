const up = 'up';
const down = 'down';

function ElevatorSystem() {
  // 1 is basement 2 is parter, so to  get the floor number in the building you need to add 2
  this.numberOfFloors = 12;
  this.elevators = { 
                     "A" : {  allowedFloors:[1,2,3,4,5,6,7,8,9,10,11],
                              destinationFloor : 2,
                              destinationQueue : [],
                              currentDirection : down,
                              currentFloor : 10,
                              label : "A",                      
                              isStopped : false,
                     },
                    "B" : {   allowedFloors:[2,3,4,5,6,7,8,9,10,11,12],
                              destinationFloor : 2,
                              destinationQueue : [],
                              currentDirection : up,
                              currentFloor : 1,
                              label : "B",
                              isStopped : false,
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
        if ( this.elevators.A.destinationQueue.length === 0 && this.elevators.B.destinationQueue.length > 0) {
          console.log(`Queueing ${destinationFloor} to elevator A, since A has empty queue`);
          this.queue(this.elevators.A, destinationFloor);
        } else {
          console.log(`Queueing ${destinationFloor} to elevator B`);
          this.queue(this.elevators.B, destinationFloor);
        }
      } else {
        if ( this.elevators.B.destinationQueue.length === 0 && this.elevators.A.destinationQueue.length > 0 ) {
          console.log(`Queueing ${destinationFloor} to elevator B, since B has empty queue`);
          this.queue(this.elevators.B, destinationFloor);
        } else {
          console.log(`Queueing ${destinationFloor} to elevator A`);
          this.queue(this.elevators.A, destinationFloor);
        }
      }
  }

  this.queue = (elevator, destinationFloor) => {
    let destinationDirection = this.calculateDirection(elevator, destinationFloor); 
    let isElevatorEmpty = elevator.destinationFloor === null || elevator.destinationFloor === undefined;
    let isSameDestinationBeforeCurrDest = destinationFloor < elevator.destinationFloor && destinationDirection === elevator.currentDirection 
    let isSameDirectionAfterCurrDest = destinationFloor > elevator.destinationFloor && destinationDirection === elevator.currentDirection 
    if (isElevatorEmpty) {
      console.log(`Starting new travel ${elevator.label}`, elevator);
      elevator.destinationFloor = destinationFloor;
      elevator.currentDirection = destinationDirection;
    } else if (isSameDirectionAfterCurrDest) { // Elevator has destination
      console.log(`Picking up someone ${elevator.label} `);
      elevator.destinationQueue.push(elevator.destinationFloor);
      elevator.destinationFloor = destinationFloor;
    } else if (isSameDirectionAfterCurrDest) {
      console.log(`Going to pick from${destinationFloor} since it is in same direction ${elevator.currentFloor}`);
      elevator.destinationQueue.push(destinationFloor);
    } else {
      // Is in different direction
      console.log(`Someone on floor ${destinationFloor} made a request, putting in queue since it is below current floor ${elevator.currentFloor}`);
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
    // console.log(elevator);
    if (elevator.destinationFloor === undefined || elevator.destinationFloor === null || elevator.isStopped ) {
      return;
    }

    elevator.currentDirection === up ? elevator.currentFloor++ : elevator.currentFloor--;
    console.log(`ACTION: Move elevator ${elevator.label} to ${elevator.currentFloor} destination: ${elevator.destinationFloor}`);
    if ( elevator.currentFloor === elevator.destinationFloor) {
      console.log(`ACTION: Elevator: ${elevator.label} Open doors`);
      // elevator doors close automatically after some seconds
      console.log(`ACTION: Elevator: ${elevator.label} Close doors`);
      let destinationFloor = elevator.destinationQueue.shift();
      if (destinationFloor != undefined && destinationFloor != elevator.destinationFloor) {
        elevator.currentDirection = this.calculateDirection(elevator, destinationFloor);
        elevator.destinationFloor = destinationFloor;
        console.log(`New destination: ${elevator.destinationFloor} Direction: ${elevator.currentDirection}`);
      } else {
        elevator.destinationFloor = null;
      }
    }
  }

  this.stopElevator = (elevatorLabel) => {
    this.elevators[elevatorLabel].isStopped = true;
  }

  this.resumeElevator = (elevatorLabel) => {
    this.elevators[elevatorLabel].isStopped = false;
  }

  this.calculateDirection = (elevator, destinationFloor) => {
    return elevator.currentFloor - destinationFloor > 0 ? down : up; 
  }

  // private functions
  function isInBoundries(test, startBoundry, endBoundry) {
    return test >= startBoundry && test <= endBoundry;
  }

  function canGoTo(test, elevator) {
    return test >= elevator.allowedFloors[0] && test <= elevator.allowedFloors[  elevator.allowedFloors.length -1];
  }
}

// Create and start the elevators
const buildingElevators = new ElevatorSystem();
setInterval(buildingElevators.travel, 1000);

// Some test runs
buildingElevators.goto(3);
buildingElevators.goto(7);
setTimeout( () => {buildingElevators.goto(9)}, 4000);
setTimeout( () => {buildingElevators.goto(1)}, 5000);
