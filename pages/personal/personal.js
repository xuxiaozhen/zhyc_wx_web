// 引入接口路径
import {
  MYHEARTMSG
} from '../../utils/path.js'

// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myheartmsg: {}
  },
  myheart: function () {
    wx.navigateTo({
      url: '../../pages/myHeart/myHeart'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: MYHEARTMSG,
      data: {
        id: options.id
      },
      success: res => {
        this.setData({
          myheartmsg: res.data.map
        })
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})