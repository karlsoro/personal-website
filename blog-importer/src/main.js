const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Keep a global reference of the window object
let mainWindow;

// Function to write audit log
function writeAuditLog(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp}: ${message}\n`;
  const logPath = path.join(__dirname, 'audit.log');
  
  fs.appendFile(logPath, logEntry, (err) => {
    if (err) console.error('Error writing to audit log:', err);
  });
}

const createWindow = () => {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Filter out harmless console warnings
  mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
    // Suppress Autofill-related warnings
    if (message.includes('Autofill.enable') || message.includes('Autofill.setAddresses')) {
      return;
    }
    // Log other console messages normally
    console.log(`[Renderer] ${message}`);
  });

  // Log network requests
  mainWindow.webContents.on('did-start-loading', () => {
    writeAuditLog('Page started loading');
  });

  mainWindow.webContents.on('did-finish-load', () => {
    writeAuditLog('Page finished loading');
  });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    writeAuditLog(`Page failed to load: ${errorCode} - ${errorDescription}`);
    console.error('Page failed to load:', errorCode, errorDescription);
  });

  // Set CSP headers to allow external resources
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; " +
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://cdn.jsdelivr.net; " +
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
          "font-src 'self' https://fonts.gstatic.com; " +
          "connect-src *;"
        ]
      }
    });
  });

  // Load the HTML file directly
  const htmlPath = path.join(__dirname, 'index.html');
  console.log('Loading HTML file:', htmlPath);
  mainWindow.loadFile(htmlPath);

  // Open DevTools in development (commented out to avoid console warnings)
  // if (process.env.NODE_ENV === 'developmen
  // t') {
  //   mainWindow.webContents.openDevTools();
  // }

  // Log when the window is closed
  mainWindow.on('closed', () => {
    writeAuditLog('Main window closed');
    mainWindow = null;
  });
};

// IPC handlers for file operations
ipcMain.handle('read-file', async (event, filePath) => {
  try {
    const content = await fs.promises.readFile(filePath, 'utf8');
    return { success: true, content };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-basename', async (event, filePath) => {
  try {
    return path.basename(filePath, '.md');
  } catch (error) {
    return '';
  }
});

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  writeAuditLog('Electron app ready');
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  writeAuditLog('All windows closed, quitting app');
  if (process.platform !== 'darwin') app.quit();
});

// Log app events
app.on('before-quit', () => {
  writeAuditLog('App quitting');
});

app.on('will-quit', () => {
  writeAuditLog('App will quit');
});

