/*
 * destructuring objects, vs arrays
 * Although destructuring in essense is the same - split object properties into multiple simple values (string, int, etc) or several objects which are simpler than the initial object
 * at it's core there is a major difference. Destructuring arrays doesn't require any information about the array, where as destructuring objects requires the user to know the properites of the object.
 */

// destructuring array
let items = [1,2,3,4,5,6,7,8,9];
let [a, ,c...] = items;

/*
 * a contains 1
 * we skip the second element
 * all other elements are stored in c, which is an array
 */

// destructuring object you need proname : valueToAssignTo
var {a: a1 = 10, b: b1 = 10} = {a: 5};
// a1 is 5 b1 is 10

// You can also use destructuring to assign default values to object properties if they are undefined
function foo({a = 12, b = "foo"} = {}) {
}

// destructuring nested objects works for as much depth as you need it to, as long as you know the exact structure of the object:
const user = {
  id: 12,
  foo : { bar : { baz : 13 } }
};
const { foo : { bar : { baz : mySecretValue } } } = user;
console.log(`My secret value: ${mySecretValue}`); // prints 13
