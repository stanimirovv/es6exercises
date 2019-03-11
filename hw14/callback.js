// Implementation
function compute(num) {
  let startTimeMs = (new Date).getTime();
  if ( num < 1 || num > 1000 ) {
    console.log(`Erroneous input: ${num}`);
    return;
  }

  console.log('Square: ', Math.pow(num, 2));

  setTimeout(() => {
    console.log('Square root:', Math.sqrt(num));
    console.log('Nearest closest number: ', findClosestPrimeNumber(num));;
    console.log('Elapsed miliseconds: ', ((new Date).getTime() - startTimeMs));
  }, num);
}

function findClosestPrimeNumber(num) {
  while( num > 0) {
    num--;
    if (isPrimeNumber(num)) {
      return num;
    }
  }
}

function isPrimeNumber(num) {
  for (let i = 2; i < num; i++) {
      if ( num % i === 0 ) {
        return false; 
      }  
  }
  return true;
}


// Test out
compute(16);
