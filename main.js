const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')
const BlendMicro = require('blendmicro')
const DEVICE_NAME = 'MagicKnock'
const bm = new BlendMicro(DEVICE_NAME)
const say = require('say')
const ipc = electron.ipcMain

bm.on('open', function(){
  console.log('Connect and open MagicKnock')
})

let mainWindow

function createWindow () {
  // Create the browser window.
  const Screen = electron.screen
  var size = Screen.getPrimaryDisplay().size;
  mainWindow = new BrowserWindow({
      left: 0,
      top: 0,
      width: size.width,   // 最大サイズで表示する
      height: size.height, // 最大サイズで表示する
      frame: true,
      fullscreen:true,
      show: true,
      resizable: true,
  })
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  // BlendMicroからの信号をBrowserProcessへIPC
  mainWindow.webContents.on('did-finish-load', function() {
    console.log('did finish loaded');
    bm.on('data', function(data){
      let cmd = data.toString()
      console.log(cmd)
      if(cmd == 0) {
        mainWindow.webContents.send('cmd', 'move')
      } else if(cmd == 1) {
        mainWindow.webContents.send('cmd', 'enter')
      }
    })
  });

  // BrowserProcessからの音声FBデータを受け取り再生する
  ipc.on('speech-message', function(event, arg) {
    say.stop()
    say.speak(arg)
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
