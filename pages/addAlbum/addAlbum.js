// pages/addAlbum/addAlbum.js
import {
  ADD_ALBUM
} from '../../utils/path.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    albumMsg: {},
    //相册名称
    albumName:'',
    //相册内容
    albumIntroduce:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  //双向绑定相册名称
  getalbumName:function(options){
this.setData({
  albumName: options.detail.value
})
  },
//双向绑定相册内容
  getalbumIntroduce:function(options){
    this.setData({
      albumIntroduce: options.detail.value
    })

  },
  //点击提交
  submit: function(options) {
    let albumName = this.data.albumName
    let albumIntroduce = this.data.albumIntroduce
    wx.request({
      url: ADD_ALBUM,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        name: albumName,
        describe: albumIntroduce
      },
      success: res => {
        this.setData({
          albumMsg: res.data
        })
        // console.log(this.data.albumMsg)
        console.log("11", this.data.albumIntroduce )
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})