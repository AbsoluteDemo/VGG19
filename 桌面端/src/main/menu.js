const { Menu, ipcMain, BrowserWindow } = require('electron')

var menuTemplate = [
    {
        label: "文件",
        submenu: [
           
            {
                label: '打开',
                accelerator: "ctrl+o",
                click: function () {
                    //主进程通知渲染进程操作文件
                    BrowserWindow.getFocusedWindow().webContents.send('action', 'open')
                }
            },
           
            {
                label: "保存",
                accelerator: "ctrl+s",
                click: () => {   //定义click事件
                    BrowserWindow.getFocusedWindow().webContents.send('action', 'save')
                }
            },
            {
                label: '生成',
                accelerator: "ctrl+p",
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents.send("edit");
                }
            },
            {
                label: "退出",
                accelerator: "ctrl+q",
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents.send('action', 'quit')

                }
            }
        ]
    },
    {
        label: "变化", //推荐在编辑里面定义角色而非快捷键  electronjs.org/docs/api/menu-item
        submenu: [


            {
                label: "上下翻转",
                accelerator: "ctrl+,",
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents.send('fanzhuan', 'shangxia')

                }
            },

            {
                label: '左右翻转',
                accelerator: "ctrl+.",
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents.send('fanzhuan', 'zuoyou')

                }
            },
            {
                type: 'separator'  //分隔符 类似于<hr>
            },
            {
                label: '手绘化',
                accelerator: "ctrl+;",
                click: function () {
                    BrowserWindow.getFocusedWindow().webContents.send('shouhui', 'zuoyou')

                }
            },
        ]
    },
    {
        label: "视图",
        submenu: [
            {
                label: "清除",
                role: 'reload'
            },
            {
                label: "缩小",
                role: "zoomout"
            },
            {
                label: "放大",
                role: "zoomin"
            },
            {
                label: "重置",
                role: "resetzoom"
            },
            {
                type: 'separator'
            },
            {
                label: '全屏',
                role: 'togglefullscreen'
            }
        ]
    },
    {
        label: '帮助',
        submenu: [
            {
                label: '关于',
                click() { require('electron').shell.openExternal('https://www.bilibili.com/'); }
            }
        ]
    }
];

var m = Menu.buildFromTemplate(menuTemplate);

Menu.setApplicationMenu(m);

//右键菜单

var contextMenuTemplate = [
   
    {
        label: "复制",
        role: "copy"
    },
    {
        label: "粘贴",
        role: "paste"
    },
    {
        type: "separator"
    },
    {
        label: "全选",
        role: 'selectall'
    }
]


var contextMenu = Menu.buildFromTemplate(contextMenuTemplate)

ipcMain.on('contextmenu', function () {
    console.log(1111)
    contextMenu.popup({ window: BrowserWindow.getFocusedWindow() })
})

