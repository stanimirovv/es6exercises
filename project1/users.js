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
function storeUser(user) {
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
    return false;
  }

  if (user.password != password ) {
    console.log("Password mismatch", user.password, " ", password);
    return false;
  }

  localStorage.setItem(loggedInUserPrefix, email);
  return true;
}

function getLoggedInUserEmail() {
  return localStorage.getItem(loggedInUserPrefix);
}

// Note: this is a bad function, should make a bunch of checks
function logout(email) {
  return localStorage.removeItem(loggedInUserPrefix);
}
