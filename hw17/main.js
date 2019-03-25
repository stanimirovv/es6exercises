/*
 * Storage
 */
function Storage() {
  const alarmKey = 'alarms';
  this.getAlarms = () => {
    let dataJSON = window.localStorage.getItem(alarmKey);
    let parsedData = JSON.parse(dataJSON);
    return parsedData;
  };
  this.setAlarms = (data) => {
    let dataJSON = JSON.stringify(data);
    window.localStorage.setItem(alarmKey, dataJSON);
  };
}

/*
 * Alarm Logic
 */
function AlarmManager() {
  this.addAlarm = () => {
    let value = document.getElementById('alarmTime').value;
    if (value === '' ) {
      console.log('Incomplete date');
      alert('Dat is incomplete!');
      return;
    }

    const storage = new Storage(); 
    let alarms = storage.getAlarms();
    if ( alarms === null ) {
      alarms = [];  
    }

    alarms.push(value);
    storage.setAlarms(alarms);
  };

  this.saveAlarms = () => {
    const storage = new Storage();
    let alarmContainer = document.getElementById('alarmContainer');

    let updatedAlarms = [];
    for ( updatedAlarm of alarmContainer.children) {
      let value = updatedAlarm.children[0].value;
      if ( value === '') {
          continue;
      }
      updatedAlarms.push(value);
    }
    storage.setAlarms(updatedAlarms);
  }

  this.renderAlarms = () => {
    const storage = new Storage();
    let alarms = storage.getAlarms();
    let alarmContainer = document.getElementById('alarmContainer');
    alarmContainer.innerHTML = '';

    if (alarms === null ) {
      return;
    }

    for (let alarm of alarms ) {
      let li = document.createElement('li');
      let input = document.createElement('input');
      input.type = 'datetime-local';
      input.value = alarm;
      li.appendChild(input);
      alarmContainer.appendChild(li);
    }
  }

  this.alarmIsTriggered = () => {
    // get alarms
    const storage = new Storage(); 
    let alarms = storage.getAlarms();
    if ( alarms === null ) {
      return false;
    }

    //iterate and compare
    let currentDate = Date.now();
    const currentDateEpoch = Math.floor(currentDate / 1000);
    for ( let alarm of alarms ) {
      const alarmDate = new Date(alarm);
      const alarmDateEpoch = alarmDate.getTime() / 1000;
      console.log(` ${alarmDateEpoch} === ${currentDateEpoch} `);
      if ( alarmDateEpoch === currentDateEpoch ) {
        return true;
      }
    }
    return false;
  };
}


/*
 * Handlers
 */
window.onload = () => {
  Notification.requestPermission( () => {} );

  const alarmManager = new AlarmManager();
  alarmManager.renderAlarms();

  // add new alarm
  document.getElementById('addNewAlarmBtn').addEventListener('click', (ev) => {
    alarmManager.addAlarm();
    alarmManager.renderAlarms();
  });

  // save or edit alarms
  document.getElementById('saveAlarms').addEventListener('click', (ev) => {
    alarmManager.saveAlarms();
    alarmManager.renderAlarms();
  });

  // Create worker for notifications
  const myWorker = new Worker('worker.js');

  myWorker.addEventListener('message', (e) => {
    console.log(`[Worker RESPONSE] : ${e.data}`);
  }, false);

  myWorker.addEventListener('error', (e) => {
    console.log(`[Worker ERROR] : Line ${e.lineno} in ${e.filename} : ${e.message}`);
  }, false);

  window.setInterval(() => {
    if ( alarmManager.alarmIsTriggered() ) {
      myWorker.postMessage('ok');
    }
  }, 1000);
};


