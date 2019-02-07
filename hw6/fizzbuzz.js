function fizzBuzz() {
  // start from 1 since task is numbers 1 to 100
  for (let i=1; i < 101; i++){
    if (i % 15 == 0) console.log("FizzBuzz");
    else if (i % 3 == 0) console.log("Fizz");
    else if (i % 5 == 0) console.log("Buzz");
    else if (isPrime(i)) console.log("prime"); // sadly not optimus
    else console.log(i);
  }
}

function isPrime(num) {
  for(var i = 2; i < num; i++) {
    if(num % i === 0) {
      return false;
    }
  }
  return num !== 1 && num !== 0;
}

fizzBuzz();
