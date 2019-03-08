import { ARTICLEINFO } from '../../utils/path.js'
import { requestAboutNews } from '../../utils/request.js'
var WxParse = require('../../wxParse/wxParse.js')

Page({

  data: {
    articleMsg: {}
  },

  // 生命周期函数--监听页面加载
  onLoad: function (e) {
    requestAboutNews(
      ARTICLEINFO,
      { articleid: e.id },
      res => {
        this.setData({
          articleMsg: res.data.data
        })
        let article = this.data.articleMsg.body
        WxParse.wxParse('article', 'html', article, this, 5)
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