# Calculator JS - Electron Desktop Application

A modern, feature-rich calculator desktop application built with **Electron**, based on the original [calculator-js](https://github.com/mohammed-ks02/calculator-js) web application.

![Calculator Preview](assets/icon.png)

## 🚀 Features

- **Full Arithmetic Operations**: Addition, subtraction, multiplication, and division
- **Calculation History**: View your last 50 calculations
- **Keyboard Support**: Use your keyboard for fast input
- **Error Handling**: Graceful handling of division by zero and invalid operations
- **Modern UI**: Beautiful gradient design with smooth animations
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Desktop Native**: System menu, shortcuts, and native window management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

Verify installation:
```bash
node --version
npm --version
```

## 🛠️ Installation

### 1. Clone or Navigate to the Project

```bash
cd calculator-js/calculator-app-electron
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Electron framework
- Electron Builder (for packaging)
- All required dependencies

> ⏱️ **Note**: First-time installation may take a few minutes as Electron downloads (~150MB)

## ▶️ Running the Application

### Development Mode

```bash
npm start
```

This launches the calculator in a desktop window with developer tools available (F12).

## 📦 Building Distributable Packages

### Build for Current Platform

```bash
npm run build
```

### Build for Specific Platforms

**Windows:**
```bash
npm run build:win
```

**macOS:**
```bash
npm run build:mac
```

**Linux:**
```bash
npm run build:linux
```

Built packages will be in the `dist/` folder:
- **Windows**: `.exe` installer (NSIS)
- **macOS**: `.dmg` disk image
- **Linux**: `.AppImage` and `.deb` package

## ⌨️ Keyboard Shortcuts

### Calculator Operations
| Key | Action |
|-----|--------|
| `0-9` | Input numbers |
| `+ - * /` | Operators |
| `.` or `,` | Decimal point |
| `Enter` or `=` | Calculate result |
| `Escape` or `C` | Clear all |
| `Backspace` | Delete last digit |
| `%` | Percentage |

### Application Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Q` | Quit application |
| `Ctrl/Cmd + R` | Reset calculator |
| `Ctrl/Cmd + Shift + H` | Clear history |
| `F12` | Toggle Developer Tools |

## 📁 Project Structure

```
calculator-app-electron/
├── main.js              # Electron main process
├── preload.js           # Secure bridge between main and renderer
├── index.html           # Calculator UI
├── calculator.js        # Calculator logic module
├── app.js               # UI interaction handlers
├── styles.css           # Styling and animations
├── package.json         # Project configuration
├── assets/
│   └── icon.png         # Application icon
├── README.md            # This file
└── TUTORIAL.md          # Detailed tutorial
```

## 🔧 Customization

### Change Window Size

Edit `main.js`:
```javascript
mainWindow = new BrowserWindow({
  width: 500,    // Change width
  height: 750,   // Change height
  // ...
});
```

### Modify Theme Colors

Edit `styles.css`:
```css
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Change these colors */
}
```

### Add New Operations

1. Add button in `index.html`
2. Implement logic in `calculator.js`
3. Handle click in `app.js`

## 🐛 Troubleshooting

### Issue: "Electron not found"
**Solution**: Reinstall dependencies
```bash
rm -rf node_modules
npm install
```

### Issue: Build fails on Windows
**Solution**: Run as administrator or check Windows Defender

### Issue: App window is blank
**Solution**: Check console (F12) for errors, ensure all files are present

### Issue: Icon not showing
**Solution**: Verify `assets/icon.png` exists and is valid PNG format

## 📝 Original Project

This Electron app is based on the original calculator-js project:
- **Repository**: https://github.com/mohammed-ks02/calculator-js
- **Branch**: desktop/calculator-app

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

**mohammed-ks02**

Built with ❤️ using Electron

---

## 🎯 Quick Start Summary

```bash
# 1. Install
cd calculator-js/calculator-app-electron
npm install

# 2. Run
npm start

# 3. Build (optional)
npm run build
```

Enjoy your calculator! 🎉
