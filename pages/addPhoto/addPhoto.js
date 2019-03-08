// pages/addPhoto/addPhoto.js
import { $init, $digest } from '../../utils/common.util.js'
import{ ADDPICTURE } from '../../utils/path.js'

Page({

  data: {
    images: [],
    albumid: ''  // 相册ID
  },

  // 添加照片的方法
  uploadPic: function(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        this.data.images = images.length <= 3 ? images : images
        $digest(this)
      }
    })
  },
  
  // 点击某个缩略图全屏查看照片的方法
  checkPhoto(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
  },

  // 点图缩略图的右上角按钮删除某个照片的方法
  removePhoto(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
    $digest(this)
  },

  // 提交照片到后台的方法
  submitphoto: function() {
    let that = this
    let imageArr = this.data.images
    if(this.data.images.length > 0) {
      for(let i = 0; i < imageArr.length ; i++) {
        wx.uploadFile({
          url: ADDPICTURE,
          filePath: imageArr[i],
          header: { "Content-Type": "multipart/form-data" },
          name: 'file',
          formData: {
            personid: wx.getStorageSync('userInfo').id,
            deptid: wx.getStorageSync('userInfo').deptid,
            describe: '我是一个普通的照片',
            albumid: that.data.albumid
          },
          success: function (res) {
            console.log(res)
          }
        })
      }
    } else {
      wx.showToast({
        title: '请添加需要上传的图片',
        icon: 'none'
      })
    }
  },

  //  生命周期函数--监听页面加载 
  onLoad: function (e) {
    $init(this)
    this.setData({
      albumid: e.id
    })
  }
})