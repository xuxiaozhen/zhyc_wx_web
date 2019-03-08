import { requestAboutNews, requestWithPost } from '../../utils/request.js'
import { EDITMOREICONS, DELETEICON, ADDICON } from '../../utils/path.js'

var iconReq = _this => {
  requestAboutNews(
    EDITMOREICONS, {},
    res => {
      _this.setData({
        homesMoreList: res.data.list
      })
    }
  )
}

Page({

  data: {
    homesMoreList: [],  // "更多" 列表
    isHide: true  // 编辑图标是否隐藏标记
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    iconReq(this)
  },

  // 编辑图标
  editIcon: function(e) {
    let iconID = e.currentTarget.dataset.id   // 图标的ID
    let iconStatus = e.currentTarget.dataset.status  // 图标的状态(是否存在))
    let iconName = e.currentTarget.dataset.iconname  // 图标的名称
    if(iconStatus === '展示') {
      // 判断图标不同的状态发出不同的请求
      requestWithPost(
        DELETEICON, { menuid: iconID },
        res => {
          wx.showToast({
            title: '已移除图标——' + iconName,
            icon: 'none'
          })
         }
      )
    } else{
      requestWithPost(
        ADDICON, { menuid: iconID },
        res => { 
          wx.showToast({
            title: '已添加图标——' + iconName,
            icon: 'none'
          })
        }
      )
    }
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading()
    iconReq(this)
  },

  // 长按显示、隐藏编辑按钮
  toggleIcon: function() {
    this.setData({
      isHide: !this.data.isHide
    })
  }
})