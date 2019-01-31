
Details:


/*
 * All men are mortal
 * Socrates is a man.
 * Therefore, socrates is mortal.

 * Using "if statements" and any other logical operators and data-types you see fit, recreate this logical argument. Your code should make clear that "socrates" is part of a collection of items referred to as "men", and that all members of this collection are mortal. You should also then demonstrate that since Socrates is part of this collection, it follows that he is mortal as well.
 */

const allMenAreMortal = true;
let men = [
   'Sokrates', 
   'John', 
];

let isSocratesMortal = false;

if (allMenAreMortal ) {
    let sokratesIsAMan = men.findIndex( (ele) => { return ele === 'Sokrates' }) !== -1;
    if ( sokratesIsAMan) {
      isSocratesMortal = true;
    }
}

/*
 * Extra Credit:
 * This cake is either vanilla or chocolate.
 * This cake is not chocolate.
 * Therefore, this cake is vanilla.
 */

let possibleCakeFlavors = [ 'vanilla', 'chocolate' ];
let cake = { 'flavor' : possibleCakeFlavors[0], pieces : 10 };

let isCakeChocolate = cake.flavor === possibleCakeFlavors[1];
if ( isCakeChocolate ) {
  console.log('Cake is chocolate!');
} else ( {
  console.log('Cake is vanilla');
}
