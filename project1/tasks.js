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

  // TODO add checks
  changeName(newName) {
    this.name = newName;
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
function getAllTasklists(username) {
  const key = getUserTasklistKey(username);
  let tasklistsJSON = localStorage.getItem(key);
  let tasklistsStruct = JSON.parse(tasklistsJSON); 
  let tasklists = [];
  for (let listStruct of tasklistsStruct) {
    let taskliskObj = new TaskList(listStruct.name, listStruct.tasks);
    tasklists.push(taskliskObj);
  }

  return tasklists;
}

function storeUserTasklists(username, taskLists) {
  const key = getUserTasklistKey(username);
  const taskListsJSON = JSON.stringify(taskLists);

  localStorage.setItem(key, taskListsJSON);
}

function getUserTasklistKey(username) {
  return username + '_tasklists';
}

// Tests
// let taskList = new TaskList();
// taskList.addTask('asd');
// taskList.addTask('dzhe asd');
// taskList.addTask('dzhe asd');

// console.log(taskList);

// taskList.finishTask(taskList.tasks[0].id);
// console.log(taskList);

// storeUserTasklists('zlati', [taskList]);

// const testTasklist = getAllTasklists('zlati');
// console.log(testTasklist);
