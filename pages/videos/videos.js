import { isLogin } from '../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  logout: function() {
    wx.removeStorage({
      key: 'userInfo',
      success: function(res) {
        wx.navigateTo({
          url: '../../pages/login/login',
        })
      },
    })
  },


  bindViewTapContent: function () {
    wx.navigateTo({
      url: '../../pages/videosContent/videosContent'
    })
  },
  bindViewTapCommenmorate: function () {
    wx.navigateTo({
      url: '../../pages/commemorate/commemorate'
    })
  },
  bindViewTapAssessment: function () {
    wx.navigateTo({
      url: '../../pages/assessment/assessment'
    })
  },
  bindViewTapAlbum: function () {
    wx.navigateTo({
      url: '../../pages/eventAlbum/eventAlbum'
    })
  },
  bindViewTapVote: function () {
    wx.navigateTo({
      url: '../../pages/voteAndResearch/voteAndResearch'
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
    isLogin()
  },

  onLoad: function() {
    isLogin()
  }
})