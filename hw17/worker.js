onmessage = function onMessageReceived(e) {
    if (Notification.permission === "granted") {
      var notification = new Notification("An alarm is triggered!");
      setTimeout(notification.close.bind(notification), 3000);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          var notification = new Notification("An alarm is triggered!");
          setTimeout(notification.close.bind(notification), 3000);
        }
       });
    } else {
      alert('ALARM!');
    }
}
