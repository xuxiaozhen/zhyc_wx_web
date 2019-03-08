import {
  ARTICLEINFO,  // 文章详情页
  ARTICLE_WATCH_RECORD,   // 文章浏览记录
  ARTICLE_WATCH_TIME    // 文章浏览时间
} from '../../utils/path.js'
import {
  requestAboutNews,
  requestWithPost
} from '../../utils/request.js'
var WxParse = require('../../wxParse/wxParse.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleMsg: {}, // 数据列表
    time: 0, // 阅读秒数
    loadingTime: '', // 定时器
    logID: ''   // 浏览记录ID
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {

    // 发送请求加载详情页面
    requestAboutNews(
      ARTICLEINFO,
      {
        articleid: e.id
      },
      res => {
        this.setData({
          articleMsg: res.data.data
        })
        let article = this.data.articleMsg.body
        WxParse.wxParse('article', 'html', article, this, 5)
        console.log(this.data.articleMsg)

        // 再次发送一个请求( 有略微回调地狱的情况 )
        let personID = wx.getStorageSync('userInfo')  // 个人信息的对象
        requestWithPost(
          ARTICLE_WATCH_RECORD,
          {
            artid: e.id,
            personid: personID.id,
            deptid: personID.deptid
          },
          res => {
            this.setData({
              logID: res.data.id
            })
          },
          res => {
            wx.showToast({
              title: '服务器繁忙，请稍后再试',
              icon: 'none',
            })
          }
        )

      },
      res => {
        wx.showToast({
          title: '服务器正忙，请稍后再试',
          icon: 'none',
        })
      }
    )

    /* ================== 设置定时器，定时器秒数作为阅读时间 ====================== */
    let timeID = setInterval(() => {
      this.setData({
        time: this.data.time += 1
      })
    }, 1000)
    this.setData({
      loadingTime: timeID
    })
  },



  // 生命周期函数--监听页面卸载

  onUnload: function () {
    // 页面卸载时同时把定时器删除
    clearInterval(this.data.loadingTime)

    // 发送请求————把阅读时间作为参数发送
    requestWithPost(
      ARTICLE_WATCH_TIME,
      {
        id: this.data.logID,  // 参数————文章ID
        duration: this.data.time.toString()   // 参数————文章浏览时间
      },
      res => {
        console.log(res)
      },
      res => {
        wx.showToast({
          title: '服务器繁忙，请稍后再试',
          icon: 'none',
        })
      }
    )
  }
})