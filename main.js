const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const ipc = electron.ipcMain;
const globalShortcut = electron.globalShortcut;
const shell = require('electron').shell;
const Tray = electron.Tray;

require('v8-compile-cache');

const iconPath = path.join(__dirname, 'assets/img/logo.png');

let win;
let authWin;

function createWindow() {
  // Tworzenie okna głównego
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    title: "Electron Messenger",
    webPreferences: {
      nodeIntegration: true
    },
    show: false
  });

  // ładowanie pliku index.html
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }));

  // Tworzenie okna autoryzacji
  authWin = new BrowserWindow({
    width: 500,
    height: 200,
    parent: win,
    modal: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // ładowanie pliku auth.html
  authWin.loadURL(url.format({
    pathname: path.join(__dirname, 'auth.html'),
    protocol: 'file',
    slashes: true
  }));

  // Anulować okna przy zamknięciu aplikacji
  win.on('closed', () => {
    win = null;
  });

  authWin.on('closed', () => {
    authWin = null;
  });
}

ipc.on('set-logged-user', function (event, arg) {
  // Wysyłanie argumnetu który mieści dane autoryzacji do okna 'win'
  win.webContents.send('set-logged-user', arg);
  // Zamknięcie okna "authWin" i otwieranie okna "win"
  authWin.close();
  win.show();
});



app.on('ready', function () {
  let tray = new Tray(iconPath);

  createWindow();
  win.webContents.openDevTools();
  // Fragmenty kodu z sekcji „Menu aplikacji”
  // ...

  const template = [
    {
      label: 'Window',
      submenu: [{
          role: 'minimize'
        },
        {
          role: 'togglefullscreen'
        },
        {
          role: 'reload'
        },
        {
          type: 'separator'
        },
        {
          role: 'close'
        }
      ]
    },
    {
      label: 'User',
      submenu: [{
        label: 'Change profile',
        click: function() {
          app.relaunch();
          app.exit();
        },
        accelerator: 'CmdOrCtrl + Shift + R'
      }]
    },
    {
      label: "Developer",
      submenu: [{
        role: 'toggledevtools'
      }]
    },
    {
      label: "Shell Module",
      submenu: [
        {
          label: "Open folder",
          click: () => {
            //               moduł path pozwala uzyskać adres folderu aplikacji
            shell.showItemInFolder(path.join(__dirname, 'assets/img/select.jpg'));
          }
        },
        {
          label: "Open Photo",
          click: () => {

            shell.openItem(path.join(__dirname, 'assets/img/select.jpg'));

          }
        },
        {
          label: "Open Electron website",
          click: () => {
            shell.openExternal('https://electron.atom.io');
          }
        }
      ]
    }
  ]

  const trayTemplate = [{
    label: "Label1",
    submenu: [{
      label: "function1",
      click: function() {/*...*/}
    }]
  }];

  // Zbudować menu z utworzonego szablonu
  trayMenu = Menu.buildFromTemplate(trayTemplate);
  // Zintegrowac menu do zasobnika
  tray.setContextMenu(trayMenu);

  tray.setToolTip('Electron Messenger');

  // Zbudować menu z utworzonego szablonu
  const menu = Menu.buildFromTemplate(template);
  // Zintegrowac menu do aplikacji
  Menu.setApplicationMenu(menu);

  const ctxMenu = new Menu()
  ctxMenu.append(new MenuItem({
    label: 'Select all text',
    role: 'selectall'
  }));

  win.webContents.on('context-menu', function (event, params) {
    ctxMenu.popup(win, params.x, params.y);
  });

  globalShortcut.register('Alt + 1', function () {
    win.show()
  });

});

// Detektor zdarzenia odpowiedzialny za wyjście z aplikacji
app.on('will-quit', function () {
  globalShortcut.unregisterAll()
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

const elementOne = document.getElementById('one');
const elementTwo = document.querySelector('#one');
