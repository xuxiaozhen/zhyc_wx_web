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
    dtcs: '',  //考试次数
    maxscore: ''  // 我的最佳成绩
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    testListReq(this)
  },

  onShow: function() {
    testListReq(this)
  },

  // 下拉刷新
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading()
    testListReq(this)
  }
})