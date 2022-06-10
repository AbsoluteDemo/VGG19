const { ipcMain, app, Tray, Menu, BrowserWindow } = require("electron");
var path = require('path')
ipcMain.on('loadImg', (e, data) => {
    console.log(data)
    e.sender.send("load", data)
})

ipcMain.on('loadFinish', (e, data) => {
    console.log(data)
    // e.sender.send("edit", data)
})
ipcMain.on('editImage', (e, data) => {
    console.log(data)
    // e.sender.send("edit", data)
})

let appIcon = null
app.whenReady().then(() => {
    appIcon = new Tray(path.join(__dirname, '../static/images/logo.png'))


    var tray = Menu.buildFromTemplate([
        {
            label: "打开",
            click: function () {
                console.log("设置")
            }
        },
        {
            label: "设置",
            click: function () {
                console.log("设置")
            }
        },
        {
            label: "退出",
            click: function () {
                if (process.platform !== 'darwin') {
                    app.quit();
                }
            }
        }
    ])
    appIcon.setContextMenu(tray)
    appIcon.setToolTip("notepad")
    //监听托盘双击事件
    appIcon.on("double-click", () => {
        win.show();
    })
})
//点击关闭保存到托盘，双击托盘打开

var win = BrowserWindow.getFocusedWindow();
win.on('close', (e) => {
    //如果是隐藏的状态，点退出直接退出
    if (!win.isFocused()) {
        win = null;
    } else {
        e.preventDefault();
        win.hide();
    }

})