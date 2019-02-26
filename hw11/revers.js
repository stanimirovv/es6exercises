function reverseJsonArray( arrayString ) {
  let parsedArray = [];
  if (typeof(arrayString) != 'string') return false;
  try {
    parsedArray = JSON.parse(arrayString); 
  } catch {
    return false;
  }
  if ( !Array.isArray(parsedArray)) return false;

  const reversedArray = parsedArray.reverse(); 

  let a;
  try {
    a = JSON.stringify(reversedArray);
  } catch {
    return false;
  }
  return a;
}

console.log( reverseJsonArray());
console.log( reverseJsonArray(false));
console.log( reverseJsonArray([1,2,3,4]));
console.log( reverseJsonArray('asd'));
console.log( reverseJsonArray('[1]'));
console.log( reverseJsonArray('[]'));
console.log( reverseJsonArray('[1,2,3,4]'));
console.log( reverseJsonArray('[1,2,3]'));
