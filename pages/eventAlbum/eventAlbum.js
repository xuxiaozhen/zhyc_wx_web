import { ALBUM } from '../../utils/path.js'
import { requestAboutNews } from '../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    albumList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    requestAboutNews(
      ALBUM,
      {
        personid: wx.getStorageSync('userInfo').id,
        deptid: wx.getStorageSync('userInfo').deptid
      },
      res => {
        this.setData({
          albumList: res.data.photoList.list
        })
        console.log(res)
      }
    )
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  }
})