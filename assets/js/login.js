const electron = require('electron');
const ipc = electron.ipcRenderer;

function logIn() {
  alert('dsa');
  ipc.send('set-logged-user');
  alert('asd');
  // return false;
}
