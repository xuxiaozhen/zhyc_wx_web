import { ABOUTPARTY, SERVER_URL_WITHOUT_PRONAME } from '../../utils/path.js'
import { requestAboutNews } from '../../utils/request.js'
import { getMoreWithPullUp, expansionDataList } from '../../utils/getMore.js'

var app = getApp();

// 党建要闻请求函数
var importantReq = _this => {
  requestAboutNews(
    ABOUTPARTY,
    { programa: 1, pageSize: 4, personid: wx.getStorageSync('userInfo').id },
    res => {
      let photoUrl = [...res.data.list]
      for (let i = 0; i < photoUrl.length; i++) {
        photoUrl[i].photo = SERVER_URL_WITHOUT_PRONAME + photoUrl[i].photo
      }
      _this.setData({
        importantNewsList: photoUrl,
        importantNewsTotalPage: res.data.page.totalPage,
        importantNewsCurrentPage: res.data.page.currentPage
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }
  )
}
// 党内公示请求函数
var placardReq = _this => {
  requestAboutNews(
    ABOUTPARTY,
    { programa: 3, pageSize: 7, personid: wx.getStorageSync('userInfo').id },
    res => {
      _this.setData({
        placardList: res.data.list,
        placardTotalPage: res.data.page.totalPage
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }
  )
}
// 党史人物请求函数
var partyHumanReq = _this => {
  requestAboutNews(
    ABOUTPARTY,
    { programa: 4, pageSize: 4, personid: wx.getStorageSync('userInfo').id },
    res => {
      let photoUrl = [...res.data.list]
      for (let i = 0; i < photoUrl.length; i++) {
        photoUrl[i].photo = SERVER_URL_WITHOUT_PRONAME + photoUrl[i].photo
      }
      _this.setData({
        partyHumanList: res.data.list,
        partyHumanTotalPage: res.data.page.totalPage
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }
  )
}
// 通知公告请求函数
var noticeReq = _this => {
  requestAboutNews(
    ABOUTPARTY,
    { programa: 2, pageSize: 7, personid: wx.getStorageSync('userInfo').id },
    res => {
      _this.setData({
        noticeList: res.data.list,
        noticeTotalPage: res.data.page.totalPage
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }
  )
}

Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 1, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置

    importantNewsList: [],  // 党建要闻数据列表
    noticeList: [],   // 通知公告数据列表
    placardList: [],  // 党内告示数据列表
    partyHumanList: [],  // 党史人物数据列表

    importantNewsCurrentPage: 1,  // 党建要闻当前页码
    importantNewsTotalPage: 1,   // 党建要闻总页数

    noticeCurrentPage: 1,  // 通知公告当前页码
    noticeTotalPage: 1,   // 通知公告总页数

    placardCurrentPage: 1,  // 党内告示当前页码
    placardTotalPage: 1,   // 党内告示总页数

    partyHumanCurrentPage: 1,  // 党史人物当前页码
    partyHumanTotalPage: 1   // 党史人物总页数
  },

  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();

    // 根据不同的"currentTab"，来发出不同type的请求
    if (this.data.currentTab == 0) {
      // 党建要闻请求
      importantReq(this)
    } else if (this.data.currentTab == 2) {
      // 党内公示请求
      placardReq(this)
    } else if (this.data.currentTab == 3) {
      // 党史人物请求
      partyHumanReq(this)
    }

  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  // 跳转党内公示详情  
  placardInfo: function(e){
    console.log(e)
  },

  // 点击加载更多的方法（党建要闻）
  getMoreToImportantNews: function() {
    getMoreWithPullUp(
      this.data.importantNewsCurrentPage,
      this.data.importantNewsTotalPage,
      ABOUTPARTY,
      { programa: 1, pageIndex: this.data.importantNewsCurrentPage + 1, pageSize: 4 },
      res => {
        this.setData({
          importantNewsList: expansionDataList(this.data.importantNewsList, res.data.list, SERVER_URL_WITHOUT_PRONAME),
          importantNewsCurrentPage: res.data.page.currentPage
        })
      }
    )
  },
  // 点击加载更多的方法（通知公告）
  getMoreToNotice: function () {
    getMoreWithPullUp(
      this.data.noticeCurrentPage,
      this.data.noticeTotalPage,
      ABOUTPARTY,
      { programa: 2, pageIndex: this.data.noticeCurrentPage + 1, pageSize: 1 },
      res => {
        this.setData({
          noticeList: expansionDataList(this.data.noticeList, res.data.list),
          noticeCurrentPage: res.data.page.currentPage
        })
      }
    )
  },
  // 点击加载更多的方法（党内公示）
  getMoreToPlacard: function () {
    getMoreWithPullUp(
      this.data.placardCurrentPage,
      this.data.placardTotalPage,
      ABOUTPARTY,
      { programa: 3, pageIndex: this.data.placardCurrentPage + 1, pageSize: 7 },
      res => {
        this.setData({
          placardList: expansionDataList(this.data.placardList, res.data.list),
          placardCurrentPage: res.data.page.currentPage
        })
      }
    )
  },
  //点击加载更多的方法（党史人物）
  getMoreToPartyHuman: function() {
    getMoreWithPullUp(
      this.data.partyHumanCurrentPage,
      this.data.partyHumanTotalPage,
      ABOUTPARTY,
      { programa: 4, pageIndex: this.data.partyHumanCurrentPage + 1, pageSize: 4 },
      res => {
        this.setData({
          partyHumanList: expansionDataList(this.data.partyHumanList, res.data.list, SERVER_URL_WITHOUT_PRONAME),
          partyHumanCurrentPage: res.data.page.currentPage
        })
      }
    )
  },

  onLoad: function () {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });

    // 发送请求数据(通知公告)
    noticeReq(this)
  },

  // 页面更改生命周期函数
  onShow: function() {
    if (this.data.currentTab == 0) {
      // 党建要闻请求
      importantReq(this)
    } else if (this.data.currentTab == 2) {
      // 党内公示请求
      placardReq(this)
    } else if (this.data.currentTab == 3) {
      // 党史人物请求
      partyHumanReq(this)
    } else if (this.data.currentTab == 1) {
      // 通知公告请求
      noticeReq(this)
    }
  },

  // 下拉刷新处理函数
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading()
    if (this.data.currentTab == 0) {
      // 党建要闻请求
      importantReq(this)
    } else if (this.data.currentTab == 2) {
      // 党内公示请求
      placardReq(this)
    } else if (this.data.currentTab == 3) {
      // 党史人物请求
      partyHumanReq(this)
    } else if (this.data.currentTab == 1) {
      // 通知公告请求
      noticeReq(this)
    }
  },

  footerTap: app.footerTap
})
