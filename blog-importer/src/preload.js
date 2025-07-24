const { contextBridge } = require('electron');
const fs = require('fs').promises;
const path = require('path');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
  readMarkdown: async (filePath) => {
    try {
      return await fs.readFile(filePath, 'utf8');
    } catch (error) {
      console.error('Error reading file:', error);
      throw error;
    }
  },
  getBasename: (filePath) => {
    try {
      return path.basename(filePath, '.md');
    } catch (error) {
      console.error('Error getting basename:', error);
      throw error;
    }
  },
});