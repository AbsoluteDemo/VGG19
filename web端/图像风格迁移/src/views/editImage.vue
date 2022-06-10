<template>
  <div id="edit" v-if="this.$store.state.flag1">
    <div class="select">
      <el-select
        v-model="value"
        placeholder="请选择风格"
        @change="onChangeImage($event)"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="btn">
      <el-upload
        action="http://localhost:3000/users/editImage"
        class="upload-demo"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-upload="handelBeforeUpload"
        :file-list="fileList"
        :on-change="handelOnChange"
        :on-success="handelSuccess"
        list-type="picture"
      >
        <el-button  type="primary">点击上传</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      src: "",
      options: [
        {
          value: "style1.jpg",
          label: "不知名风格1",
        },
        {
          value: "style2.jpg",
          label: "不知名风格2",
        },
        {
          value: "style3.jpg",
          label: "不知名风格3",
        },
        {
          value: "style4.jpg",
          label: "不知名风格4",
        },
        {
          value: "style5.jpg",
          label: "不知名风格5",
        },
        {
          value: "style6.jpg",
          label: "不知名风格6",
        },
        {
          value: "style7.jpg",
          label: "不知名风格7",
        },
      ],
      value: "",
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handelBeforeUpload(file) {
      // element-ui的upload组件提供的上传组件中在beforeUpload中返回promised对前端的file文件进行二次更改，并可以做判断和其他参数传入等操作
      this.fileAdd(file).then((res) => console.log(res, "res"));

      console.log("this.$store.state.src1=" + this.$store.state.src1);
      return new Promise((resolve) => {
        this.fileAdd(file).then((res) => resolve(res));
      });
    },
    handelOnChange(file, fileList) {
      console.log("1111");
      console.log(fileList, "filelist");
      console.log("1111");
      this.$store.state.flag1 = 0;
      this.$store.state.loading = !this.$store.state.loading;
      this.$store.state.src1 = file.url;
    },
    handelSuccess(response, file, fileList) {
      this.$store.state.src = response.url;
      console.log("------------------");
      this.src = this.$store.state.src;
      console.log(this.src);

      console.log("fiel:" + file.url, fileList);
      this.$store.state.flag = 0;
    },
    fileAdd(file) {
      return new Promise((resolve) => {
        //判断是否为图片文件
        if (file.type.indexOf("image") == -1) {
          console.log("请选择图片文件");
        } else {
          let reader = new FileReader();
          let image = new Image();
          let _this = this;
          reader.readAsDataURL(file);
          reader.onload = function () {
            file.src = this.result;
            image.onload = function () {
              let width = image.width;
              let height = image.height;
              file.width = width;
              file.height = height;
              _this.imgL = file.src; //页面上显示所选择的图片
              console.log("++++++++");
              console.log(file.src);
            };
            console.log(file);
            image.src = file.src;
            _this
              .imgCompress(file, { quality: 0.2 })
              .then((res) => resolve(res));
          };
        }
      });
    },
    // 图片压缩 压缩之后的base64编码格式文件经过convertBase64UrlToBlob()方法转换成file文件并通过promise返回
    imgCompress(path, obj) {
      //path是指上传的图片，obj是压缩的品质，越低越模糊
      console.log("压缩之前");
      return new Promise((resolve) => {
        let _this = this; //这里的this 是把vue的实例对象指向改变为_this
        var img = new Image();
        img.src = URL.createObjectURL(path);
        console.log(path.name, "path");
        img.onload = function () {
          var that = this; //这里的this 是把img的对象指向改变为that
          // 默认按比例压缩
          var w = that.width,
            h = that.height,
            scale = w / h;
          w = obj.width || w;
          h = obj.height || w / scale;
          var quality = 0.7; // 默认图片质量为0.7
          //生成canvas
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          // 创建属性节点
          var anw = document.createAttribute("width");
          anw.nodeValue = w;
          var anh = document.createAttribute("height");
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          ctx.drawImage(that, 0, 0, w, h);
          // 图像质量
          if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = obj.quality;
          }
          // quality值越小，所绘制出的图像越模糊
          var base64 = canvas.toDataURL("image/jpeg", quality);
          // 回调函数返回base64的值
          var urlFile = _this.convertBase64UrlToBlob(base64, path.name); //这个地方的处理是为了把压缩的base64转化为对象，获得压缩后图片的大小size，方便对压缩后的图片再次进行判断；
          // console.log(urlFile, base64, "base64")
          _this.partitionBase = base64.split(",")[1];
          _this.imgType = "." + urlFile.type.split("/")[1];
          resolve(urlFile);
        };
      });
    },
    //将base64码转化为file（Blob）
    //此处函数对压缩后的base64经过处理返回{size: "", type: ""}
    convertBase64UrlToBlob(dataurl, filename) {
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {
        type: mime,
      });
    },
    onChangeImage(val) {
      let obj = this.options.find((item) => {
        return item.value === val;
      });
      this.$store.state.src2 = this.value;
      this.$store.state.flag2 = 1;
      console.log(this.value);
      console.log(obj);
    },
  },
};
</script>

<style>
#edit {
  display: flex;
  justify-content: center;
  padding-top: 100px;
}
.select{
  margin: 0 20px;
}
</style>