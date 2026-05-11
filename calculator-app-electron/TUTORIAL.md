# Complete Tutorial: Building an Electron Desktop Calculator

This comprehensive tutorial will guide you through understanding and extending the Calculator JS Electron application.

## Table of Contents

1. [Introduction to Electron](#1-introduction-to-electron)
2. [Project Overview](#2-project-overview)
3. [Understanding the Architecture](#3-understanding-the-architecture)
4. [Setting Up the Development Environment](#4-setting-up-the-development-environment)
5. [Creating the Main Process](#5-creating-the-main-process)
6. [Creating the Preload Script](#6-creating-the-preload-script)
7. [Building the User Interface](#7-building-the-user-interface)
8. [Implementing Calculator Logic](#8-implementing-calculator-logic)
9. [Styling the Application](#9-styling-the-application)
10. [Testing the Application](#10-testing-the-application)
11. [Building for Production](#11-building-for-production)
12. [Next Steps and Enhancements](#12-next-steps-and-enhancements)

---

## 1. Introduction to Electron

### What is Electron?

Electron is a framework that allows developers to build cross-platform desktop applications using web technologies: **HTML**, **CSS**, and **JavaScript**. It combines the Chromium rendering engine with the Node.js runtime.

**Popular Electron Apps:**
- Visual Studio Code
- Slack
- Discord
- WhatsApp Desktop
- Figma

### Key Concepts

#### Main Process
The main process runs in a Node.js environment and is responsible for:
- Creating and managing browser windows
- Handling application lifecycle events
- Accessing native OS APIs
- Managing menus and dialogs

#### Renderer Process
Each window runs in its own renderer process, which:
- Displays the web content (HTML/CSS/JS)
- Runs in a sandboxed browser environment
- Cannot directly access Node.js APIs (for security)

#### Preload Scripts
Preload scripts run before the renderer process loads and provide a secure bridge between the main and renderer processes.

---

## 2. Project Overview

### Directory Structure

```
calculator-app-electron/
├── main.js              # Main process - creates windows, handles app lifecycle
├── preload.js           # Secure bridge between main and renderer
├── index.html           # HTML structure of the calculator
├── calculator.js        # Core calculation logic
├── app.js               # UI event handlers and DOM manipulation
├── styles.css           # Visual styling
├── package.json         # Project configuration and dependencies
├── assets/
│   └── icon.png         # Application icon
├── README.md            # Quick start guide
└── TUTORIAL.md          # This file
```

### Technology Stack

- **Electron**: Desktop application framework
- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with gradients, animations, and grid layout
- **JavaScript (ES6+)**: Application logic with modern features
- **Electron Builder**: Packaging and distribution tool

---

## 3. Understanding the Architecture

### Application Flow

```
┌─────────────────┐
│   main.js       │ ← Main Process (Node.js)
│  (Electron App) │
└────────┬────────┘
         │
         │ IPC (Inter-Process Communication)
         │
┌────────▼────────┐
│  preload.js     │ ← Context Bridge (Secure)
└────────┬────────┘
         │
         │ Exposed APIs
         │
┌────────▼────────┐
│  index.html     │ ← Renderer Process (Browser)
│  + app.js       │
│  + calculator.js│
└─────────────────┘
```

### Security Model

Electron uses **context isolation** to separate the preload script from the renderer:

1. **No Node.js in Renderer**: Prevents direct access to system APIs
2. **Context Bridge**: Explicitly exposes only needed APIs
3. **IPC Communication**: Secure message passing between processes

---

## 4. Setting Up the Development Environment

### Step 1: Install Node.js

Download from [nodejs.org](https://nodejs.org/) or use a version manager:

**Windows/macOS:**
```bash
# Download installer from nodejs.org
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Step 2: Verify Installation

```bash
node --version  # Should show v16.x or higher
npm --version   # Should show 8.x or higher
```

### Step 3: Clone the Project

```bash
git clone https://github.com/mohammed-ks02/calculator-js.git
cd calculator-js/calculator-app-electron
```

### Step 4: Install Dependencies

```bash
npm install
```

This installs:
- `electron`: The Electron framework
- `electron-builder`: For creating distributable packages

---

## 5. Creating the Main Process

### Understanding main.js

The main process is the entry point of your Electron application.

#### Key Components:

**1. Module Imports**
```javascript
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
```

**2. Window Creation**
```javascript
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 750,
    webPreferences: {
      nodeIntegration: false,      // Security: disable Node in renderer
      contextIsolation: true,      // Security: enable context isolation
      preload: path.join(__dirname, 'preload.js')  // Load preload script
    }
  });
  
  mainWindow.loadFile('index.html');  // Load HTML file
}
```

**3. Application Lifecycle**
```javascript
app.whenReady().then(createWindow);  // Create window when ready

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();  // Quit on Windows/Linux when all windows closed
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();  // Re-create window on macOS dock click
  }
});
```

**4. Menu Creation**
```javascript
const menuTemplate = [
  {
    label: 'File',
    submenu: [
      { label: 'Exit', accelerator: 'CmdOrCtrl+Q', click: () => app.quit() }
    ]
  },
  {
    label: 'Help',
    submenu: [
      { 
        label: 'About', 
        click: () => { /* Show about dialog */ } 
      }
    ]
  }
];
```

### Exercise: Modify Window Properties

Try changing these values in `main.js`:

```javascript
mainWindow = new BrowserWindow({
  width: 600,           // Make wider
  height: 800,          // Make taller
  minWidth: 400,        // Minimum width
  minHeight: 600,       // Minimum height
  resizable: true,      // Allow resizing
  maximizable: true,    // Allow maximizing
  backgroundColor: '#667eea'  // Background color while loading
});
```

---

## 6. Creating the Preload Script

### Understanding preload.js

The preload script runs in a special context that has access to both:
- Node.js APIs (like `ipcRenderer`)
- DOM APIs (like `window` object)

#### Key Components:

**1. Context Bridge Setup**
```javascript
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Methods exposed to the renderer
});
```

**2. Secure Channel Definition**
```javascript
send: (channel, data) => {
  const validChannels = ['clear-history'];
  if (validChannels.includes(channel)) {
    ipcRenderer.send(channel, data);
  }
}
```

**3. Event Listening**
```javascript
on: (channel, func) => {
  const validChannels = ['clear-history'];
  if (validChannels.includes(channel)) {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  }
}
```

### Security Best Practices

✅ **DO:**
- Whitelist specific channels
- Validate incoming data
- Expose only necessary APIs

❌ **DON'T:**
- Expose entire `ipcRenderer` object
- Allow arbitrary channel names
- Execute untrusted code

### Exercise: Add a New API

Add a method to get the app version:

```javascript
contextBridge.exposeInMainWorld('electronAPI', {
  // Existing methods...
  
  // New method
  getVersion: () => {
    return app.getVersion();
  }
});
```

Then use it in your renderer:
```javascript
if (window.electronAPI) {
  console.log('App version:', window.electronAPI.getVersion());
}
```

---

## 7. Building the User Interface

### Understanding index.html

The HTML structure defines the calculator layout.

#### Key Sections:

**1. Display Area**
```html
<div class="display-container">
  <input type="text" id="display" class="display" readonly placeholder="0">
  <div id="result-info" class="result-info"></div>
</div>
```

**2. Button Grid**
```html
<div class="buttons-grid">
  <button class="btn btn-operator" data-action="clear">C</button>
  <button class="btn btn-number" data-action="number" data-value="7">7</button>
  <!-- More buttons... -->
</div>
```

**3. History Section**
```html
<div class="history-section">
  <h3>Historique des calculs</h3>
  <div id="history" class="history-list"></div>
</div>
```

### Data Attributes for Event Handling

Using `data-*` attributes makes event handling cleaner:

```html
<button data-action="operator" data-value="+">+</button>
```

```javascript
// In app.js
const action = button.dataset.action;  // "operator"
const value = button.dataset.value;    // "+"
```

### Exercise: Add a New Button

Add a square root button:

**HTML:**
```html
<button class="btn btn-operator" data-action="sqrt">√</button>
```

**JavaScript (in calculator.js):**
```javascript
const squareRoot = () => {
  const { currentValue } = state;
  const num = parseFloat(currentValue);
  
  if (num < 0) {
    return { success: false, error: 'NEGATIVE_SQRT' };
  }
  
  state.currentValue = String(Math.sqrt(num));
  return { success: true, display: state.currentValue };
};
```

---

## 8. Implementing Calculator Logic

### Understanding calculator.js

This module contains all calculation logic using the **Module Pattern**.

#### State Management

```javascript
let state = {
  currentValue: '0',        // Current display value
  previousValue: null,      // Previous operand
  operator: null,           // Current operator
  waitingForOperand: false, // Waiting for next number
  history: []               // Calculation history
};
```

#### Core Operations

**1. Input Digit**
```javascript
const inputDigit = (digit) => {
  const { currentValue, waitingForOperand } = state;
  
  if (waitingForOperand) {
    state.currentValue = digit;
    state.waitingForOperand = false;
  } else {
    state.currentValue = currentValue === '0' ? digit : currentValue + digit;
  }
  
  return { success: true, display: state.currentValue };
};
```

**2. Set Operator**
```javascript
const setOperator = (nextOperator) => {
  const { currentValue, previousValue, operator } = state;
  
  // If we have a previous operation, calculate first
  if (previousValue && operator) {
    const result = performOperation(operator, previousValue, currentValue);
    state.previousValue = String(result.result);
    state.currentValue = String(result.result);
  } else {
    state.previousValue = currentValue;
  }
  
  state.operator = nextOperator;
  state.waitingForOperand = true;
};
```

**3. Calculate Result**
```javascript
const calculate = () => {
  const { currentValue, previousValue, operator } = state;
  
  const result = performOperation(operator, previousValue, currentValue);
  
  // Add to history
  addToHistory(result);
  
  // Reset state
  state.currentValue = String(result.result);
  state.previousValue = null;
  state.operator = null;
  
  return result;
};
```

### Error Handling

```javascript
const performOperation = (operator, a, b) => {
  // Check for division by zero
  if (operator === '/' && parseFloat(b) === 0) {
    return {
      success: false,
      error: 'DIVISION_BY_ZERO',
      message: 'Error: Division by zero'
    };
  }
  
  // Perform operation
  let result;
  switch (operator) {
    case '+': result = parseFloat(a) + parseFloat(b); break;
    case '-': result = parseFloat(a) - parseFloat(b); break;
    case '*': result = parseFloat(a) * parseFloat(b); break;
    case '/': result = parseFloat(a) / parseFloat(b); break;
  }
  
  return { success: true, result };
};
```

### Exercise: Add Memory Functions

Add memory store/recall functionality:

```javascript
let memory = 0;

const memoryStore = () => {
  memory = parseFloat(state.currentValue);
  return { success: true, message: 'Stored in memory' };
};

const memoryRecall = () => {
  state.currentValue = String(memory);
  return { success: true, display: state.currentValue };
};

const memoryClear = () => {
  memory = 0;
  return { success: true, message: 'Memory cleared' };
};
```

---

## 9. Styling the Application

### Understanding styles.css

Modern CSS techniques used in the calculator.

#### CSS Grid for Button Layout

```css
.buttons-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);  /* 4 equal columns */
  gap: 10px;                              /* Space between buttons */
}
```

#### Gradient Background

```css
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

#### Button Styles with Hover Effects

```css
.btn {
  padding: 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.btn:active {
  transform: translateY(0);
}
```

#### Color Coding

```css
.btn-number {
  background: #ecf0f1;
  color: #2c3e50;
}

.btn-operator {
  background: #3498db;
  color: white;
}

.btn-equals {
  background: #e74c3c;
  color: white;
}
```

### Responsive Design

```css
@media (max-width: 480px) {
  .calculator-container {
    padding: 20px;
  }
  
  .display {
    font-size: 2rem;  /* Smaller on mobile */
  }
  
  .btn {
    padding: 15px;    /* Smaller buttons */
  }
}
```

### Exercise: Create a Dark Theme

Add a dark mode toggle:

**CSS:**
```css
body.dark-theme {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

body.dark-theme .calculator-container {
  background: #2d2d44;
}

body.dark-theme .display {
  color: #fff;
  background: #1a1a2e;
}

body.dark-theme .btn-number {
  background: #3d3d5c;
  color: #fff;
}
```

**JavaScript:**
```javascript
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', 
    document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}
```

---

## 10. Testing the Application

### Manual Testing Checklist

#### Basic Operations
- [ ] Addition (5 + 3 = 8)
- [ ] Subtraction (10 - 4 = 6)
- [ ] Multiplication (6 × 7 = 42)
- [ ] Division (20 ÷ 4 = 5)

#### Edge Cases
- [ ] Division by zero
- [ ] Multiple decimal points
- [ ] Leading zeros
- [ ] Large numbers
- [ ] Negative results

#### Keyboard Support
- [ ] Number keys (0-9)
- [ ] Operator keys (+, -, *, /)
- [ ] Enter/Return for equals
- [ ] Escape for clear
- [ ] Backspace for delete

#### UI/UX
- [ ] Button hover effects
- [ ] Display updates correctly
- [ ] History shows calculations
- [ ] Error messages appear
- [ ] Window resizes properly

### Debugging Tips

**1. Open Developer Tools**
Press `F12` or `Ctrl+Shift+I` to open DevTools.

**2. Console Logging**
Add logs in your code:
```javascript
console.log('Current state:', state);
console.log('Result:', result);
```

**3. Breakpoints**
Use `debugger;` statement to pause execution:
```javascript
const calculate = () => {
  debugger;  // Execution pauses here
  // ... rest of code
};
```

**4. Network Tab**
Check for any resource loading issues.

---

## 11. Building for Production

### Understanding electron-builder

`electron-builder` packages your app into distributable formats.

#### Configuration in package.json

```json
{
  "build": {
    "appId": "com.mohammedks02.calculator",
    "productName": "Calculator JS",
    "directories": {
      "output": "dist"
    },
    "files": [
      "**/*",
      "!dist/**",
      "!README.md"
    ],
    "win": {
      "target": "nsis",
      "icon": "assets/icon.ico"
    },
    "mac": {
      "target": "dmg",
      "category": "public.app-category.utilities"
    },
    "linux": {
      "target": ["AppImage", "deb"]
    }
  }
}
```

### Build Commands

**Test Build (Current Platform):**
```bash
npm run build
```

**Platform-Specific Builds:**
```bash
npm run build:win    # Windows (.exe)
npm run build:mac    # macOS (.dmg)
npm run build:linux  # Linux (.AppImage, .deb)
```

### Build Output

After building, find your distributables in `dist/`:

```
dist/
├── Calculator JS-1.0.0.exe          # Windows installer
├── Calculator JS-1.0.0.dmg          # macOS disk image
├── Calculator JS-1.0.0.AppImage     # Linux AppImage
└── Calculator JS-1.0.0.deb          # Debian package
```

### Code Signing (Optional but Recommended)

For production releases, sign your app:

**Windows:**
```json
"win": {
  "certificateSubjectName": "Your Company Name"
}
```

**macOS:**
```json
"mac": {
  "identity": "Developer ID Application: Your Name"
}
```

---

## 12. Next Steps and Enhancements

### Feature Ideas

#### 1. Scientific Mode
Add trigonometric functions, logarithms, exponents:
```javascript
const sin = () => {
  const num = parseFloat(state.currentValue);
  state.currentValue = String(Math.sin(num));
};

const log = () => {
  const num = parseFloat(state.currentValue);
  state.currentValue = String(Math.log10(num));
};
```

#### 2. Unit Converter
Add conversion between units (length, weight, temperature).

#### 3. Currency Converter
Integrate with a currency API for real-time exchange rates.

#### 4. Expression History
Allow clicking on history items to reuse calculations.

#### 5. Themes
Create multiple color themes users can switch between.

#### 6. Keyboard Macros
Support for complex expressions typed via keyboard.

### Advanced Topics

#### 1. Auto-Updates
Implement automatic updates using `electron-updater`:

```javascript
const { autoUpdater } = require('electron-updater');

autoUpdater.checkForUpdatesAndNotify();
```

#### 2. System Tray Icon
Add a system tray icon for quick access:

```javascript
const { Tray, Menu } = require('electron');
const tray = new Tray('assets/icon.png');
```

#### 3. Global Shortcuts
Register global keyboard shortcuts:

```javascript
const { globalShortcut } = require('electron');

globalShortcut.register('CommandOrControl+Shift+C', () => {
  mainWindow.show();
});
```

#### 4. Native File Dialogs
Save/load calculation history:

```javascript
const { dialog } = require('electron');

const result = await dialog.showSaveDialog(mainWindow, {
  title: 'Save History',
  filters: [{ name: 'JSON', extensions: ['json'] }]
});
```

#### 5. Database Integration
Use SQLite or NeDB for persistent storage:

```javascript
const Database = require('better-sqlite3');
const db = new Database('calculator.db');
```

### Publishing Your App

#### 1. GitHub Releases
Upload builds to GitHub Releases for distribution.

#### 2. App Stores
- **Microsoft Store**: Requires MSIX packaging
- **Mac App Store**: Follow Apple's guidelines
- **Snap Store**: For Linux distribution

#### 3. Website Distribution
Host downloads on your website with proper code signing.

### Learning Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [Electron Builder Docs](https://www.electron.build/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)

### Join the Community

- Electron GitHub Issues
- Stack Overflow (tag: electron)
- Reddit: r/electronjs
- Discord: Electron community server

---

## Conclusion

Congratulations! You've learned how to:

✅ Understand Electron architecture (main, renderer, preload)
✅ Create secure IPC communication
✅ Build a functional calculator with JavaScript
✅ Style with modern CSS techniques
✅ Handle user input and errors gracefully
✅ Package for multiple platforms
✅ Test and debug effectively
✅ Plan future enhancements

Now you have the foundation to build more complex Electron applications. Start experimenting, add new features, and share your creation with the world!

**Happy Coding! 🚀**

---

*This tutorial is part of the Calculator JS Electron project.*
*For more information, visit the [GitHub repository](https://github.com/mohammed-ks02/calculator-js).*
