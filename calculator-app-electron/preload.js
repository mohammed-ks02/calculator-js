const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// specific Electron APIs without exposing the entire Electron API
contextBridge.exposeInMainWorld('electronAPI', {
  // Send messages to main process
  send: (channel, data) => {
    const validChannels = ['clear-history'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  
  // Receive messages from main process
  on: (channel, func) => {
    const validChannels = ['clear-history'];
    if (validChannels.includes(channel)) {
      // Strip event as it includes `sender` 
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  
  // Remove listener
  removeListener: (channel, func) => {
    const validChannels = ['clear-history'];
    if (validChannels.includes(channel)) {
      ipcRenderer.removeListener(channel, func);
    }
  },
  
  // Get platform information
  getPlatform: () => process.platform,
  
  // Check if running in Electron
  isElectron: true
});
