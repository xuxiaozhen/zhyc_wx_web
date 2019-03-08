// pages/voteAndResearch/voteAndResearch.js
import{POLING} from '../../utils/path.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //投票调研数据列表
polingList:[],
polingcurrentPage:1,
polingtotalpage:1
  },


  // 上拉(点击按钮)列表加载更多数据
  getMore: function () {
      //polingcurrentPage: res.data.page.totalPage
    if (this.data.polingcurrentPage < this.data.polingtotalpage) {
      wx.request({
        url: POLING,
        data: {
          pageIndex: this.data.polingtotalpage + 1,
        },
        success: res => {
          let tempList = [...this.data.polingList]
          for (let i = 0; i < res.data.list.length; i++) {
            tempList.push(res.data.list[i])
          }
          this.setData({
            polingList: tempList,
            polingcurrentPage: res.data.page.currentPage
          })
          console.log(this.data.polingList)
        }
      })
    } else {
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {

    
    if (this.data.polingList.length === 0) {
wx.request({
  url: POLING,
  data:{
    currentPage:1,
    pageRecord:1
  },
  success: res => {
    this.setData({
      polingList: res.data.list,
      polingtotalpage: res.data.page.totalPage
      
    })
    console.log(res.data.page)
    console.log(this.data.polingtotalpage)
    console.log(this.data.polingList)
  }
})
  }
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