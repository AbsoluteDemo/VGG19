var express = require('express');
let fs = require('fs');
let multer = require('multer')
let path = require('path')
var router = express.Router();
var User = require('../controller/imageController')
var cp = require('child_process');
var spawn = require("child_process").spawn;

const storage = multer.diskStorage({

  //存储的位置
  destination(req, file, cb) {
    cb(null, 'public/')
  },
  //文件名字的确定 multer默认帮我们取一个没有扩展名的文件名，因此需要我们自己定义
  filename(req, file, cb) {
    cb(null, file.originalname)
    img_path = path.join(__dirname, file.originalname);
  }
})



//传入storage 除了这个参数我们还可以传入dest等参数
const upload = multer({ storage })
router.post('/editImage', upload.single('file'), (req, res) => {

  //给客户端返回图片的访问地址 域名 + 文件名字 

  let url = 'http://127.0.0.1:3000/output/' + '20.jpg'



  let url1 = 'public/' + req.file.originalname
  cp.execSync('python train.py' + ' ' + url1, (error, stdout, stderr) => {
    if (error) {
      console.log(error)
    }
    console.log("运行成功！")
  })



  res.json({ url })
})

module.exports = router;
