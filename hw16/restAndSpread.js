// Both rest and spread are primarily syntax sugar for working with collections.
// Although they aren't technically new functionality they reduce boilerplate, make code do more things with less lines of code.

// spread is used when you have a collection and want to use it in a function without having to destructure it, or break it down.

function multiplyThree(one, two, three) {
  return one * two * three;
}

let arr = [1,2,2];

console.log('Multiplied: ', multiplyThree(...arr));

// good example for rest is log function e.g. having extra fields which should be parsable.
// In this case, the divisory will be === so if someone needs to parse the logs he/she should split by ===

function log(message, ...fields) {
  let fieldsStr = fields.join('===') 
  console.log(`${message}===${fieldsStr}`);
}

log('Hello world', 'field1', 'field2', 'field3');

