const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  getCalendarEvents: () => ipcRenderer.invoke('get-calendar-events')
})