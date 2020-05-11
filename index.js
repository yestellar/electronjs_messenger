const electron = require('electron');
const ipc = electron.ipcRenderer;
const axios = require('axios');

const actionButton = document.getElementById('action_button');

console.log(actionButton);

actionButton.addEventListener('click', function() {
  ipc.send('action-button-clicked')
})

ipc.on('action-button-clicked', function(event) {
  console.log('sss');
})


// vonrims17
// diagnogame@gmail.com
// 112233
const vonrims_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InZvbnJpbXMxNyIsImlhdCI6MTU4Njg1NzE2MiwiZXhwIjoxNTg5NDQ5MTYyfQ.ImQrqY-tmUc5jdoV3mE4HoJIb3EE_vzhd1Udj7JArHk";

// podarokek
// podarokek@gmail.com
// 112233
const podarokek_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InBvZGFyb2tlayIsImlhdCI6MTU4Njg1NzIwOCwiZXhwIjoxNTg5NDQ5MjA4fQ.FfW60c2o3f6lcji08qB9JFz7ILuxJSPJhFKOq1EOCTE";
