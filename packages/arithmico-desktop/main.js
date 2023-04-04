const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Arithmico Desktop",
  });

  win.loadFile("./web-dist/index.html").catch((e) => console.error(e));
  win.setIcon("./web-dist/logo512.png");
  win.setMenu(null);
  win.maximize();
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
