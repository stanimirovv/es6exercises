/*
 * Business logic, no storage
 */
class TaskList {
  /* public functions */
  constructor(name='', tasks=[]) {
    this.name = name;
    this.tasks = tasks;
  }

  addTask(description) {
    if (typeof(description) != 'string') {
      return false; 
    }
    let newTask = this.createTask(description);
    this.tasks.push(newTask);
    return true;
  }

  finishTask(taskID) {
    if (typeof(taskID) != 'integer') {
      return false;
    }
    let index = this.tasks.findIndex( task => task.id === taskID); 
    this.tasks[index].isFinished = true;
    return true;
  } 

  finishAllTasks() {
    for (task of this.tasks) {
      task.isFinished = true;
    }
  }

  changeName(newName) {
    if ( newName === undefined || newName === ''){
      return null;
    }
    this.name = newName;
    return 1;
  }

  /* private functions */
  createTask(description) {
    const taskID = Math.floor(Math.random() * 100000);
    return { "description": description, isFinished: false, id: taskID };
  }

}

/*
 * Storage related tasks
 */
function getAllTasklists(email) {
  const key = getUserTasklistKey(email);
  let tasklistsJSON = localStorage.getItem(key);
  let tasklistsStruct = JSON.parse(tasklistsJSON); 
  if (tasklistsStruct === null ) {
    return null;
  }
  let tasklists = [];
  for (let listStruct of tasklistsStruct) {
    let taskliskObj = new TaskList(listStruct.name, listStruct.tasks);
    tasklists.push(taskliskObj);
  }

  return tasklists;
}

function storeUserTasklists(email, taskLists) {
  if (email === undefined || email === '' || typeof(taskLists) != 'object') {
    return false;
  }
  const key = getUserTasklistKey(email);
  const taskListsJSON = JSON.stringify(taskLists);

  localStorage.setItem(key, taskListsJSON);
  return true;
}

function getUserTasklistKey(email) {
  return email + '_tasklists';
}
