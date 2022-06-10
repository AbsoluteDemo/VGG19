const { ENGINE_METHOD_STORE } = require('constants');
var { ipcRenderer, remote } = require('electron');
var fs = require('fs');
var path = require('path')
var cp = require("child_process")



ipcRenderer.on('action', (e, action) => {
    console.log(action);

    switch (action) {
        case "open":
            remote.dialog.showOpenDialog({
                properties: ['openFile']

            }).then((result) => {

                if (result.filePaths.length > 0) {
                    console.log(result)
                    var imgPath = path.join("F:/大三上/自主学习/electron学习/electron-vue/imageTransform/src/static/images", path.basename(result.filePaths[0]))
                    var readStream = fs.createReadStream(result.filePaths[0]);
                    // readStream.on('data', data => {
                    //     str += data;
                    // })
                    // readStream.on('end', () => {
                    //     console.log("str:", str)
                    // })
                    // readStream.set({ 'Content-Type': 'image/jpg' });
                    var writedStream = fs.createWriteStream(imgPath);
                    // writedStream.end()
                    readStream.pipe(writedStream);
                    ipcRenderer.send('loadImg', imgPath)
                    document.title = imgPath
                    //获取文件里的内容

                }

            })
            break;
        case "save":
            saveCurrentDoc()
            break;
        case "quit":
            askSaveDialog();
            ipcRenderer.send('quit')
            break;
        // case "openPicture":

    }
})

ipcRenderer.on('load', (e, data) => {
    document.getElementById('img1').src = data
    ipcRenderer.send("loadFinish", data)
})

ipcRenderer.on('edit', (e, data) => {
    document.getElementById('img2').src = ''
    cp.execSync('python train.py' + ' ' + document.title, (error, stdout, stderr) => {
        if (error) {
            console.log(error)
        }
        console.log("运行成功！")
    })

    document.getElementById('img2').src = 'F:/大三上/自主学习/electron学习/electron-vue/imageTransform/src/static/output/20.jpg'
})

//翻转
ipcRenderer.on('fanzhuan', (e, action) => {
    let imgPath = document.title
    let imgPath1 = action + path.basename(document.title)
    console.log(action);
    cp.execSync('python image.py' + ' ' + imgPath + ' ' + action, (error, stdout, stderr) => {
        if (error) {
            console.log(error)
        }
        console.log("运行成功！")
    })
    document.getElementById('img1').src = path.join('F:/大三上/自主学习/electron学习/electron-vue/imageTransform/src/static/images', imgPath1)
    document.title = path.join('F:/大三上/自主学习/electron学习/electron-vue/imageTransform/src/static/images', imgPath1)
})
//手绘
ipcRenderer.on('shouhui', (e) => {
    let imgPath = document.title
    let imgPath1 = "1" + path.basename(document.title)

    cp.execSync('python shouhui.py' + ' ' + imgPath, (error, stdout, stderr) => {
        if (error) {
            console.log(error)
        }
        console.log("运行成功！")
    })
    document.getElementById('img1').src = path.join('F:/大三上/自主学习/electron学习/electron-vue/imageTransform/src/static/images', imgPath1)
    document.title = path.join('F:/大三上/自主学习/electron学习/electron-vue/imageTransform/src/static/images', imgPath1)
})

//监听右键菜单
window.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    ipcRenderer.send('contextmenu');
})

var currentFile = ""
function saveCurrentDoc() {
    if (!currentFile) {
        var dir = remote.dialog.showSaveDialogSync({
            defaultPath: 'undefined.jpg',
            filters: [
                { name: 'All File', extensions: ['*'] }
            ]
        });
        if (dir) {
            var content = fs.readFileSync(document.title)
            fs.writeFileSync(dir, content)
            console.log(content);

            currentFile = dir;
            isSave = true;
            document.title = currentFile;
        }
    } else {
        var content = fs.readFileSync(document.title)
        fs.writeFileSync(dir, content)
        console.log(content);
        document.title = currentFile;
        isSave = true;
    }
}