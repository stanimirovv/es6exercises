/*
 * constants
 */
const timeUnits = ["seconds", "minutes", "hours", "days", "second", "minute", "hour", "day"];

/* 
 * public functions
 */

function timeAdder(firstTimeCount, firstTimeUnit, secondTimeCount, secondTimeUnit) {
  // Validate input
  let havePositiveNumbers = isPositiveNumber(firstTimeCount) && isPositiveNumber(secondTimeCount); 
  let haveValidTimeUnits = isValidTimeUnit(firstTimeUnit) && isValidTimeUnit(secondTimeUnit); 
  let isInputValid = haveValidTimeUnits && havePositiveNumbers;
  if ( !isInputValid) {
    return false;
  }

  // Transform to seconds and add
  firstTimeSeconds = transformToSeconds(firstTimeCount, firstTimeUnit);
  secondTimeSeconds = transformToSeconds(secondTimeCount, secondTimeUnit);
  let totalSeconds = firstTimeSeconds + secondTimeSeconds;
  
  // Transform to highest possible 
  return transformToHighestTime(totalSeconds);
}

/*
 * private functions
 */

// Input validation
function isPositiveNumber(possibleNumber) {
  return typeof(possibleNumber) === 'number' && possibleNumber > 0 ? true : false;
}

function isValidTimeUnit(possibleUnit) {
  return timeUnits.indexOf(possibleUnit) != -1? true : false;
}

// unit transformation

// Since we return on first line, there are no breaks
// Transform to seconds since it's the smallest number
function transformToSeconds(count, unit) {
  switch (unit) {
    case 'second':
      return count;
    case 'seconds':
      return count;
    case 'minute':
      return count * 60;
    case 'minutes':
      return count * 60;
    case 'hour':
      return count * 60 * 60;
    case 'hours':
      return count * 60 * 60;
    case 'day':
      return count * 60 * 60 * 24;
    case 'days':
      return count * 60 * 60 * 24;
  }

}

// Start from biggest possible and try to fit it in an exact number of units 
// so if there is anything leftover (or is it carryover in english?) after the division the next unit should be tried
function transformToHighestTime(count) {
  console.log('count:', count, count % (60 * 60 * 24));
      // days
    if (count % (60 * 60 * 24) === 0 ) {
      return [count / (60 * 60 * 24 ), 'hours'];
    } else if ( count % (60 * 60) === 0) {
      // hours
      return [count / (60 * 60), 'hours'];
    } else if (count % 60 === 0) {
      // minutes
      return [count / 60, 'minutes'];
    } else {
      //seconds
      return [count, 'seconds'];
    }
}


console.log(timeAdder(20,"hours",5,"hours"));

/* tests */
/*
console.log( isPositiveNumber(1));
console.log( isPositiveNumber('1'));
console.log( isPositiveNumber(-1));
console.log( isValidTimeUnit(-1));
console.log( isValidTimeUnit('seconds'));
 
timeAdder(1,"minute",3,"minutes")
timeAdder(5,"days",25,"hours")
timeAdder(1,"minute",240,"seconds")

 */
