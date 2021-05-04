const { app, BrowserWindow, ipcMain } = require('electron');
const Twit = require('twit');

const apikey = 'vdxtWgjXGyxV3sF0WZl233Kna';
const apiSecretKey = 'FXTGA7q650ZREkEPP2qlsJlOGUC4iq9sbqyiU0EBAhxmxdrSGd';
const accessToken = '1387839720521183232-7pa2FsW8g3ckpifGYqmpFqMtXq2JbS';
const accessTokenSecret = 'BtgmH07JVIzZMPBOcxbzfE3wlLiIwwSn24NGFlajzvNZw';

var T = new Twit({
  consumer_key:         apikey,
  consumer_secret:      apiSecretKey,
  access_token:         accessToken,
  access_token_secret:  accessTokenSecret,
});

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  win.loadURL('http://localhost:3000');
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.on('get-tweets', (event, user) => {
  T.get('statuses/user_timeline', { screen_name: user, count: 5 }, function(err, data, response) {
    const search = {user, tweets: data};
    event.reply('get-tweets-reply', search)
  })
})