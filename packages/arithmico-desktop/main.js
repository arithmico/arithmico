const { app, BrowserWindow } = require("electron");
const path = require("path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Arithmico Desktop",
  });

  win
    .loadFile(path.join(__dirname, "./web-dist/index.html"))
    .catch((e) => console.error(e));
  win.setIcon(path.join(__dirname, "./web-dist/logo512.png"));
  win.setMenu(null);
  win.maximize();
  //win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
