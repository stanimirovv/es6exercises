function initializeLogin() {
  let app = document.getElementById('app');
  app.innerHTML = '';
  
  let loginForm = document.createElement('div');
  let text = document.createElement('p');
  text.innerText = 'Login form';

  let loginEmail = document.createElement('input');
  loginEmail.placeholder = 'Email';
  let loginPassword = document.createElement('input');
  loginPassword.type = 'password';
  loginPassword.placeholder = 'Password';


  let submit = document.createElement('button');
  submit.innerText = 'Login!';
  submit.addEventListener('click', function(ev){
    console.log(ev.target.parentNode);
    let loginForm = ev.target.parentNode;
    let email = loginForm.childNodes[1].value;
    let password = loginForm.childNodes[2].value;
    login(email, password); 
    dashboard();
  });

  let registerBtn = document.createElement('button');
  registerBtn.innerText = 'Register!';
  registerBtn.addEventListener('click', function(ev){
    console.log(ev.target.parentNode);
    initializeRegister();
  });

  loginForm.appendChild(text);
  loginForm.appendChild(loginEmail);
  loginForm.appendChild(loginPassword);
  loginForm.appendChild(submit);
  loginForm.appendChild(registerBtn);
  
  app.appendChild(loginForm);
}

function initializeRegister() {
  let app = document.getElementById('app');
  app.innerHTML = '';
  
  let registerForm = document.createElement('div');
  let text = document.createElement('p');
  text.innerText = 'Register form';

  let registerEmail = document.createElement('input');
  registerEmail.placeholder = 'Email';
  let registerPassword = document.createElement('input');
  registerPassword.type = 'password';
  registerPassword.placeholder = 'Password';
  let firstName = document.createElement('input');
  firstName.placeholder = 'First name';
  let lastName = document.createElement('input');
  lastName.placeholder = 'Last Name';


  let submit = document.createElement('button');
  submit.innerText = 'Register!';
  submit.addEventListener('click', function(ev){
    console.log(ev.target.parentNode);
  });

  registerForm.appendChild(text);
  registerForm.appendChild(firstName);
  registerForm.appendChild(lastName);
  registerForm.appendChild(registerEmail);
  registerForm.appendChild(registerPassword);
  registerForm.appendChild(submit);
  
  app.appendChild(registerForm);
}

function dashboard() {
  // print header   
  // print lists
  // add list
  // edit list
}

// click on list

function users() {
}


