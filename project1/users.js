/*
 * All user specific operations will acess the local storage, so the class itself will, for now, only validate props in constructor
 */

/*
 * Constants
 */
const usersPrefix = 'user_';
const loggedInUserPrefix = 'current_loggedin_user_email';

// TODO add param checking
class User {
  constructor(firstName, lastName, email, password ) {
    return { 'firstName' : firstName, 'lastName' : lastName, 'email' : email, 'password' : password};  
  }
}


/*
 * Functions with local storage access
 */
// TODO check type of user
function store(user) {
  let userJSON = JSON.stringify(user);
  const key = generateKey(user.email);
  localStorage.setItem(key, userJSON);
  return true;
}

function generateKey(email) {
  return 'user_' + email;
}

function fetchUser(email) {
  const key = generateKey(email);
  return JSON.parse(localStorage.getItem(key));
}

function login(email, password) {
  let user = fetchUser(email); 
  if (user === null ) {
    console.log("User doesn't exist!", email);
    return null;
  }

  if (user.password != password ) {
    console.log("Password mismatch", user.password, " ", password);
    return null;
  }

  localStorage.setItem(loggedInUserPrefix, email);
}

function getLoggedInUser() {
  return localStorage.getItem(loggedInUserPrefix);
}

function logout(email) {
  return localStorage.removeItem(loggedInUserPrefix);
}

// Tests
// let newUser = new User('Zlatin', 'Testov', 'zlatin@zlat.in', '123');
// store(newUser);
// let storedUser = fetchUser(newUser.email);
// console.log(storedUser);
// console.log('LoggedIn: ', getLoggedInUser());
// login(newUser.email, newUser.password);
// console.log('LoggedIn: ', getLoggedInUser());
// logout(newUser.email);
// console.log('LoggedIn: ', getLoggedInUser());
