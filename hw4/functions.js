/*
Let's go back to your syllogism (logical argument) examples from Homework #3. Now it's time to turn those loose bits of logic into functions. Rather than having procedure that demonstrates that Socrates is mortal, you should create a function that accepts a name and returns a boolean (True or False) representing whether that name identifies a man who is mortal or not. Your function to gracefully handle unexpected inputs (such as an unrecognized name or a name that is a not a string at all) without throwing an exception.
*/

function isMortal(name) {
  // Mortal men, needs to be extended if there are any more mortal men
  const mortalMen = [
     'Sokrates', 
     'John', 
  ];

  let isMortal = false;

  return mortalMen.findIndex( (ele) => { return ele === name }) !== -1;
}

// Test cases for code coverage
console.log(isMortal('Sokrates'));
console.log(isMortal('Sokrates1'));
// Test cases to verify no exceptions will be thrown for wrong info
console.log(isMortal(''));
console.log(isMortal(123));
console.log(isMortal(undefined));
console.log(isMortal(null));
console.log(isMortal({}));

/*
Extra Credit:

If you did the extra credit on Homework #3, let's turn that example into a function as well. It should accept in 2 arguments:

1. An array of all cake possibilities (vanilla or chocolate)
2. A boolean representing whether or not the cake is chocolate.

It should return a string indicating the actual flavor of the cake.
*/

let possibleCakeFlavorsA = [ 'vanilla', 'chocolate' ];
let possibleCakeFlavorsB = [ 'chocolate', 'strawberry' ];


function getCakeFlavor( possibleCakeFlavors, isChocolateCake) {
  // Remove the chocolate, the second flavor may not be vanilla
  // Also nothing is specified for the ordering so we need to find it's index before we remove it.
  let index = possibleCakeFlavors.indexOf('chocolate');
  if (index > -1) {
    possibleCakeFlavors.splice(index, 1);
  }

  if (isChocolateCake) {
    return 'chocolate'; 
  } else {
    return possibleCakeFlavors[0];
  }
}

// test cases
console.log(getCakeFlavor( possibleCakeFlavorsA, true));
console.log(getCakeFlavor( possibleCakeFlavorsA, false));
console.log(getCakeFlavor( possibleCakeFlavorsB, false));
