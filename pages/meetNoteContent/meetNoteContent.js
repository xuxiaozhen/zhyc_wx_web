var WxParse = require('../../wxParse/wxParse.js')

import {
  THREELESSONMEETNOTE,
  THREELESSONINFO
} from '../../utils/path.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meetid: '',
    personid: '',
    datanoteMsg: {},
    dataMsg:{},
    content:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    wx.request({
      url: THREELESSONMEETNOTE,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        meetid: options.id,
        personid: wx.getStorageSync('userInfo').id

      },
      success: res => {
        this.setData({
          datanoteMsg: res.data,
        })
        console.log(res)
        console.log(this.data.datanoteMsg)
      }
    }),
      wx.request({
        url: THREELESSONINFO,
        data: {
          meetingNoticeId: options.id,
          personid: wx.getStorageSync('userInfo').id

        },
        success: res => {
          this.setData({
            dataMsg: res.data.Data,
            content:res.data.Data.content

          })
          let article = this.data.dataMsg.content
          WxParse.wxParse('article', 'html', article, this, 5)
          
          console.log(this.data.dataMsg)
        }
      })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})