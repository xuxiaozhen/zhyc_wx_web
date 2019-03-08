import { TEST_LIST } from '../../utils/path.js'
import { requestAboutNews } from '../../utils/request.js'

// 获取考试列表请求函数
var testListReq = _this => {
  requestAboutNews(
    TEST_LIST,
    { pageRecord: 4, currentPage: 1 },
    res => {
      _this.setData({
        testList: res.data.list,
        dtcs: res.data.dtcs,
        maxscore: res.data.maxscore
      })
    }
  )
}

Page({
  data: {
    testList: [],  // 考试列表
    
    testCurrentPage: 1,   // 考试列表当前页
    testTotalPage: 1   // 考试列表总页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    testListReq(this)
  },

  // 下拉刷新列表
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading()
    testListReq(this)
  }
})