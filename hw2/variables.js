/*
Variables

Variables are containers for values in a program, in JS you don't need to worry about types, variables are assigned the same way.
Variable names should be descriptive, abbreviations should be avoided.
Generally redeclaring variables in the same scope with the same name is considered a bad practise and should be avoided

const

variables with value that can't and mustn't change. Good for storing 'magic variables', static configuration and the likes.

let

variables declared with let have block scope. They aren't hoisted and they need to be declared before being used.
Personally this is my go-to for variables that aren't constants

var and hoisting

The declaration of variables declared with 'var' is always moved to the top of the scope (usually function or file)
This means that you can assign values to variables and modify the values before declaring them.
It may also lead to issues, e.g. var type variables inside the function have function scope, so this may make certain errors harder to debug. 
Personally I would avoid declaring variables with 'var' and hoisting altogether

*/

// Constatns should be used when the value must remain the same, such as extention file for logs
const fileType = '.txt';

// let and var can be modified and should be used as standard data containers, keeping in mind that var variables are hoistered;
let count = 0;
var number = 123;
