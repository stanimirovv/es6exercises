// TODO remove all magic variables
function initializeLogin() {
  let app = document.getElementById('app');
  app.innerHTML = '';

  renderHeader();

  if ( getLoggedInUserEmail() != null ) {
    return renderDashboard();
  }
  
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
    let ok = login(email, password); 
    if(!ok) {
      errMsg('Authentication error!');
      return;
    }
    renderDashboard();
  });

  let registerBtn = document.createElement('button');
  registerBtn.innerText = 'Register!';
  registerBtn.addEventListener('click', function(ev){
    console.log(ev.target.parentNode);
    renderRegister();
  });

  loginForm.appendChild(text);
  loginForm.appendChild(loginEmail);
  loginForm.appendChild(loginPassword);
  loginForm.appendChild(submit);
  loginForm.appendChild(registerBtn);
  
  app.appendChild(loginForm);
}

function renderRegister() {
  let app = document.getElementById('app');
  app.innerHTML = '';
  renderHeader();
  
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
  
  let termsAgree = document.createElement('input');
  termsAgree.type = 'checkbox';
  let termsAgreeLabel = document.createElement('span');
  termsAgreeLabel.innerText = 'I agree to the Terms of Use';

  let submit = document.createElement('button');
  submit.innerText = 'Register!';
  submit.addEventListener('click', function(ev){
    let loginForm = ev.target.parentNode;
    let firstName = loginForm.childNodes[1].value;
    let lastName = loginForm.childNodes[2].value;
    let email = loginForm.childNodes[3].value;
    let password = loginForm.childNodes[4].value;
    const agreed = loginForm.childNodes[5].checked;
    if ( !agreed) {
      errMsg('You must agree to our terms');
      return;
    }

    let existingUser = fetchUser(email);
    if( existingUser != null || existingUser != undefined ) {
      errMsg('User with this email exists!');
      return;
    }

    let newUser = new User(firstName, lastName, email, password); 
    if( newUser === null ) {
      errMsg('Invalid field values');
      return;
    }
    storeUser(newUser);
    storeUserTasklists(email, []); 
    login(email, password);
    renderDashboard();
  });

  registerForm.appendChild(text);
  registerForm.appendChild(firstName);
  registerForm.appendChild(lastName);
  registerForm.appendChild(registerEmail);
  registerForm.appendChild(registerPassword);
  registerForm.appendChild(termsAgree);
  registerForm.appendChild(termsAgreeLabel);
  registerForm.appendChild(submit);
  
  app.appendChild(registerForm);
}

function renderDashboard() {
  // Get Data
  // TODO error handling for null
  let loggedInUserEmail = getLoggedInUserEmail();
  const user = fetchUser(loggedInUserEmail);
  let tasklists = getAllTasklists(loggedInUserEmail);
  
  // Render UI
  let app = document.getElementById('app');
  app.innerHTML = '';
  renderHeader();

  // header
  let header = document.createElement('p');
  header.innerHTML = 'Logged in as: ' + user.firstName + '  ' + user.lastName;
  // add list form
  let newTaskListInput = document.createElement('input');
  newTaskListInput.placeholder = 'Add new tasklist name';
  let submit = document.createElement('button');
  submit.innerText = 'Add task list';
  submit.addEventListener('click', addTasklist);
  
  // render list form
  let ul = document.createElement('ul');
  for (tasklist of tasklists) {
    let li = document.createElement('li');
    li.innerText = tasklist.name;
    ul.appendChild(li);
  }
  ul.addEventListener('click', viewTaskList);

  app.appendChild(header);
  app.appendChild(newTaskListInput);
  app.appendChild(submit);
  app.appendChild(ul);
}

function renderTasklist(tasklist) {
  let app = document.getElementById('app');
  app.innerHTML = '';
  renderHeader();

  console.log(tasklist.tasks);
  
  let ul = document.createElement('ul');
  for (task of tasklist.tasks) {
    console.log('task: ', task);
    let li = document.createElement('li');
    li.innerText = task.description;
    li.setAttribute('data-id', task.id);
    if ( task.isFinished) {
      li.className = 'finishedTask'; 
    }
    ul.appendChild(li);
  }
  ul.addEventListener('click', ev => {
    const taskId = ev.target.getAttribute('data-id');
    for (task of tasklist.tasks ) {
      console.log('taskID: ', taskId, '  curr task id: ', task.id);
      if(task.id == taskId ) { // non strict checking is on purpose
        task.isFinished = task.isFinished ? false : true; 
        renderTasklist(tasklist);
      }
    } 
  });
  
  let saveBtn = document.createElement('button');
  saveBtn.innerText = 'Save';
  saveBtn.addEventListener('click', ev => {
    let loggedInUserEmail = getLoggedInUserEmail();
    let lists = getAllTasklists(loggedInUserEmail);
    for (list of lists) {
      if( list.name === tasklist.name) {
        const newName = document.getElementById('tasklistName').value;
        list.name = newName;
        list.tasks = tasklist.tasks;
      }
    }
    storeUserTasklists(loggedInUserEmail, lists);
    console.log(lists);
  });

  let input = document.createElement('input');
  input.placeholder = 'Enter task description';
  let addTaskBtn = document.createElement('button');
  addTaskBtn.innerText = 'Add new Task';
  addTaskBtn.addEventListener('click', (ev) => {
    let description = ev.target.parentNode.childNodes[1].value;
    tasklist.addTask(description); 
    renderTasklist(tasklist);
  });


  let taskName = document.createElement('input');
  taskName.id = 'tasklistName';
  taskName.value = tasklist.name;
  
  app.appendChild(taskName);
  app.appendChild(input);
  app.appendChild(addTaskBtn);
  app.appendChild(ul);
  app.appendChild(saveBtn);
}

function renderHeader() {
  const currentLoggedInUserEmail = getLoggedInUserEmail();    

  let appHeader = document.getElementById('header');
  appHeader.innerHTML = '';

  let header = document.createElement('div');
  if ( currentLoggedInUserEmail === null ) {
    return appHeader.appendChild(header);
  }
  
  let settings = document.createElement('button'); 
  settings.innerHTML = 'settings';
  settings.addEventListener('click', function(ev) { initialiseSettigns(); });
  let logOut = document.createElement('button'); 
  logOut.innerHTML = 'log out';
  logOut.addEventListener('click', function(ev) { logout(currentLoggedInUserEmail); initializeLogin(); });

  let br = document.createElement('span');
  br.innerHTML = '	&nbsp;	&nbsp;	&nbsp;';

  header.appendChild(settings);
  header.appendChild(br);
  header.appendChild(logOut);

  return appHeader.appendChild(header);
}

/*
 * Event listeners
 */
function addTasklist(ev){
  console.log(ev.target.parentNode);
  const loggedInUserEmail = getLoggedInUserEmail();
  let tasklists = getAllTasklists(loggedInUserEmail);
  let newTaskListName = app.childNodes[1].value;
  let newTasklist = new TaskList(newTaskListName, []);
  tasklists.push(newTasklist);
  storeUserTasklists(loggedInUserEmail, tasklists);
  renderDashboard();
}

function viewTaskList(ev) {
  const target = ev.target;
  const loggedInUserEmail = getLoggedInUserEmail();
  let tasklists = getAllTasklists(loggedInUserEmail);
  if ( target.nodeName != 'LI') {
    return; 
  }
  console.log(tasklists);
  console.log('innerText', target.innerText);
  for ( tasklist of tasklists) {
    if (tasklist.name === target.innerText){
      // do stuff 
      console.log('tasklist: ', tasklist);   
      renderTasklist(tasklist);
      return;
    }
  }
  console.log('Non existing task list', target.innerText);
}

function initialiseSettigns() {
  let loggedInUserEmail = getLoggedInUserEmail();
  const user = fetchUser(loggedInUserEmail);

  let app = document.getElementById('app');
  app.innerHTML = '';
  renderHeader();
  
  let userEditMenu = document.createElement('div');
  let text = document.createElement('p');
  text.innerText = 'Register form';

  let firstName = document.createElement('input');
  firstName.placeholder = 'First name';
  firstName.value = user.firstName;
  let lastName = document.createElement('input');
  lastName.placeholder = 'Last Name';
  lastName.value = user.lastName;
  let registerPassword = document.createElement('input');
  registerPassword.type = 'password';
  registerPassword.placeholder = 'Password';
  registerPassword.value = user.password;

  let submit = document.createElement('button');
  submit.innerText = 'Update!';
  submit.addEventListener('click', function(ev){
    let userEditMenu = ev.target.parentNode;
    user.firstName = userEditMenu.childNodes[0].value;
    user.lastName = userEditMenu.childNodes[1].value;
    user.password = userEditMenu.childNodes[2].value;

    storeUser(user);
    renderDashboard();
  });

  userEditMenu.appendChild(firstName);
  userEditMenu.appendChild(lastName);
  userEditMenu.appendChild(registerPassword);
  userEditMenu.appendChild(submit);
  
  app.appendChild(userEditMenu);
}

function errMsg(msg) {
  document.getElementById('notification').innerHTML = '<span style="background:red;"> Error: ' + msg +"</span>";
}

