const { app, BrowserWindow, ipcMain } = require('electron')
const { createClient } = require('@supabase/supabase-js')
const { google } = require('googleapis')
const fs = require('fs')
const path = require('path')

function getResourcePath(filename) {
  return app.isPackaged
    ? path.join(process.resourcesPath, filename)
    : path.join(__dirname, filename)
}

const credentials = JSON.parse(fs.readFileSync(getResourcePath('client_secret.json')))
const { client_id, client_secret, redirect_uris } = credentials.installed
const token = JSON.parse(fs.readFileSync(getResourcePath('token.json')))
const { supabaseUrl, supabaseKey } = require(getResourcePath('mainConfig.js'))

const supabase = createClient(supabaseUrl, supabaseKey)

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
)

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
async function syncEventsToSupabase() {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

  const response = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  })

  const events = response.data.items

  // clear old events first
  const { error: deleteError } = await supabase
    .from('Events')
    .delete()
    .neq('id', 0)  // deletes all rows (Supabase requires some filter condition, "not equal to 0" matches everything since ids start at 1)

  if (deleteError) {
    console.error('Error clearing old events:', deleteError)
  }

  for (const event of events) {
    const isAllDay = event.start.dateTime == undefined

    const { error } = await supabase
      .from('Events')
      .insert({
        title: event.summary,
        start_time: isAllDay ? null : event.start.dateTime,
        all_day: isAllDay,
        event_date: isAllDay ? event.start.date : event.start.dateTime.split('T')[0]
      })

    if (error) {
      console.error('Error syncing event:', error)
    }
  }
}

setInterval(syncEventsToSupabase, 1800000)  // every 30 min
syncEventsToSupabase()  // also run once on startup


function createWindow() {
  const win = new BrowserWindow({
    width: 745,
    height: 1030,
    frame: false,
    fullscreen: true,
    icon: path.join(__dirname, 'icon.ico'),
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