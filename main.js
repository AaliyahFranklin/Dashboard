const { app, BrowserWindow,ipcMain } = require('electron')
const { google } = require('googleapis')
const fs = require('fs')

// Load credentials file
const credentials = JSON.parse(fs.readFileSync('./client_secret.json'))
const { client_id, client_secret, redirect_uris } = credentials.installed

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
)
const token = JSON.parse(fs.readFileSync('./token.json'))
oAuth2Client.setCredentials(token)


ipcMain.handle('get-calendar-events', async () => {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

  const response = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  })

  return response.data.items
})

const path = require('path')
function createWindow() {
  const win = new BrowserWindow({
    width: 745,
    height: 1030,
    frame:true,
    fullscreen:false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})