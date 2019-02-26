function initializeLogin() {
  let app = document.getElementById('app');
  app.innerHTML = '';

  renderHeader();

  if ( getLoggedInUserEmail() != null ) {
    return renderDashboard();
  }

  app.innerHTML = renderLoginTemplate();
  let submit = document.getElementById('loginBtn');
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

  let registerBtn = document.getElementById('registerBtn');
  registerBtn.innerText = 'Register!';
  registerBtn.addEventListener('click', function(ev){
    console.log(ev.target.parentNode);
    renderRegister();
  });
}

function renderLoginTemplate() {
  return `<div><p>Login form</p><input id="inputEmail" placeholder="Email" ><input id="inputPassword" type="password" placeholder="Password"><button id="loginBtn">Login!</button><button id="registerBtn">Register!</button></div>`;
}

function renderRegister() {
  let app = document.getElementById('app');
  app.innerHTML = renderRegisterTemplate();;
  renderHeader();

  let submit = document.getElementById('registerBtn');
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
}

function renderRegisterTemplate() {
  return `<div><p>Register form</p><input placeholder="First name"><input placeholder="Last Name"><input placeholder="Email"><input type="password" placeholder="Password"><input type="checkbox"><span>I agree to the Terms of Use</span><button id="registerBtn">Register!</button></div>`;
}

function renderDashboard() {
  // Get Data
  let loggedInUserEmail = getLoggedInUserEmail();
  const user = fetchUser(loggedInUserEmail);
  let tasklists = getAllTasklists(loggedInUserEmail);
  
  // Render UI
  let app = document.getElementById('app');
  app.innerHTML = renderDashboardHeaderTemplate(user.firstName, user.lastName);
  app.innerHTML += renderDashboardListsTemplate(tasklists);
  renderHeader();

  let submit = document.getElementById('taskListBtn');
  submit.addEventListener('click', addTasklist);
  // render list form
  let ul = document.getElementById('taskLists');
  ul.addEventListener('click', viewTaskList);
}

function renderDashboardHeaderTemplate(firstName, lastName) {
  return `<p>Logged in as: ${firstName} ${lastName}</p><input placeholder="Add new tasklist name"><button id="taskListBtn">Add task list</button>`;
}

function renderDashboardListsTemplate(tasklists) {
  let tasklistsTemplate = '';
  for (tasklist of tasklists) {
    tasklistsTemplate += `<li>${tasklist.name}</li>`;
  }
  return `<ul id="taskLists">${tasklistsTemplate}</ul>`;
}

function renderTasklist(tasklist) {
  let app = document.getElementById('app');
  app.innerHTML = '';
  renderHeader();

  console.log(tasklist.tasks);

  let taskName = `<input type="text" id="tasklistName" value="${tasklist.name}"/>`;
  let input = `<input type="text"  placeholder="Enter task description" />`;
  let addTaskBtnHtml = `<button id="addTaskBtn">Add new Task!</button>`;
  let saveListHtml = `<button id="saveList">Save!</button>`;
  let listHtml = `<ul id="asd">`;
  for (task of tasklist.tasks) {
    console.log('task: ', task);
    if ( task.isFinished) {
      listHtml += `<li class="finishedTask">${task.description}</li>`;
    } else {
      listHtml += `<li data-id="${task.id}">${task.description}</li>`;
    }
  }
  listHtml += `</ul>`;
  
  app.innerHTML += taskName;
  app.innerHTML += input;
  app.innerHTML += addTaskBtnHtml;
  app.innerHTML += listHtml;
  app.innerHTML += saveListHtml;
  
  let ul = document.getElementById('asd');
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
  
  let saveBtn = document.getElementById('saveList');
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

  let addTaskBtn = document.getElementById('addTaskBtn');
  addTaskBtn.addEventListener('click', (ev) => {
    let description = ev.target.parentNode.childNodes[1].value;
    tasklist.addTask(description); 
    renderTasklist(tasklist);
  });

  // input.placeholder = 'Enter task description';
  
}

function renderHeader() {
  const currentLoggedInUserEmail = getLoggedInUserEmail();    

  let appHeader = document.getElementById('header');
  appHeader.innerHTML = '';

  if ( currentLoggedInUserEmail === null ) {
    return appHeader.innerHTML = '<div></div>';
  }
  appHeader.innerHTML = renderHeaderTemplate();
  
  let settings = document.getElementById('settingsBtn'); 
  settings.addEventListener('click', function(ev) { initialiseSettigns(); });
  let logOut = document.getElementById('logoutBtn'); 
  logOut.addEventListener('click', function(ev) { logout(currentLoggedInUserEmail); initializeLogin(); });
}

function renderHeaderTemplate() {
  return `<div id="header"><div><button id="settingsBtn">settings</button><span>	&nbsp;	&nbsp;	&nbsp;</span><button id="logoutBtn">log out</button></div></div>`;
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
  app.innerHTML = renderSettingsTemplate();
  renderHeader();
  
  let submit = document.getElementById('updateBtn');
  submit.addEventListener('click', function(ev){
    let userEditMenu = ev.target.parentNode;
    user.firstName = userEditMenu.childNodes[0].value;
    user.lastName = userEditMenu.childNodes[1].value;
    user.password = userEditMenu.childNodes[2].value;

    storeUser(user);
    renderDashboard();
  });
}

function renderSettingsTemplate() {
  return `<input placeholder="First name"><input placeholder="Last Name"><input type="password" placeholder="Password"><button id="updateBtn">Update!</button>`;
}

function errMsg(msg) {
  document.getElementById('notification').innerHTML = `<span style="background:red;"> Error: ${msg} </span>`;
}

