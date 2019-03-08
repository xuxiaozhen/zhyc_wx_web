// 引入接口路径
import {
  TASKMANAGEMENT
} from '../../utils/path.js'

// pages/taskManagement/taskManagement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenName: false,
    taskmanagementmsg:{},
    personid:''
  },

  user: function () {
    wx.reLaunch({
      url: '../../pages/users/users'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: TASKMANAGEMENT,
      data: {
        personid: wx.getStorageSync('userInfo').id
      },
      success: res => {
        this.setData({
          taskmanagementmsg: res
        }),
        console.log(res)
        console.log("会议参与次数"+this.data.taskmanagementmsg.data.hy_cy_num)
        console.log("已召开会议次数"+this.data.taskmanagementmsg.data.hy_total_num)
        if (this.data.taskmanagementmsg.data.hy_total_num - this.data.taskmanagementmsg.data.hy_cy_num===0){
          hiddenName: !this.data.hiddenName
          console.log("隐藏你有会议缺席")
        }else{
          hiddenName: this.data.hiddenName
          console.log("你有会议缺席")
        }
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