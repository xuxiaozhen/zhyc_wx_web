import { ARTICLELIST, SERVER_URL_WITHOUT_PRONAME } from '../../utils/path.js'
import { requestAboutNews } from '../../utils/request.js'
import { getMoreWithPullUp, expansionDataList } from '../../utils/getMore.js'

// "全部" 请求的函数
var allReq = _this => {
  requestAboutNews(
    ARTICLELIST,
    { type: 678, pageSize: 6 },
    res => {
      let photoUrl = [...res.data.list]
      for (let i = 0; i < photoUrl.length; i++) {
        photoUrl[i].photo = SERVER_URL_WITHOUT_PRONAME + photoUrl[i].photo
      }
      _this.setData({
        allList: photoUrl,
        allTotalPage: res.data.page.totalPage,
        allCurrentPage: res.data.page.currentPage
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    },
    res => {
      wx.showToast({
        title: '服务器繁忙，请稍后再试',
        icon: 'none',
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }
  )
}
// "组织工作" 请求的函数
var jobsReq = _this => {
  requestAboutNews(
    ARTICLELIST,
    { type: 6, pageSize: 6 },
    res => {
      let photoUrl = [...res.data.list]
      for (let i = 0; i < photoUrl.length; i++) {
        photoUrl[i].photo = SERVER_URL_WITHOUT_PRONAME + photoUrl[i].photo
      }
      _this.setData({
        jobsList: photoUrl,
        jobsTotalPage: res.data.page.totalPage,
        jobsCurrentPage: res.data.page.currentPage
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    },
    res => {
      wx.showToast({
        title: '服务器繁忙，请稍后再试',
        icon: 'none',
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }
  )
}
// "党建教育" 请求的函数
var educationReq = _this => {
  requestAboutNews(
    ARTICLELIST,
    { type: 8, pageSize: 6 },
    res => {
      let photoUrl = [...res.data.list]
      for (let i = 0; i < photoUrl.length; i++) {
        photoUrl[i].photo = SERVER_URL_WITHOUT_PRONAME + photoUrl[i].photo
      }
      _this.setData({
        educationList: photoUrl,
        educationTotalPage: res.data.page.totalPage,
        educationCurrentPage: res.data.page.currentPage
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    },
    res => {
      wx.showToast({
        title: '服务器繁忙，请稍后再试',
        icon: 'none',
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }
  )
}
// "党建视频" 请求的函数
var videoReq = _this => {
  requestAboutNews(
    ARTICLELIST,
    { type: 7, pageSize: 6 },
    res => {
      let photoUrl = [...res.data.list]
      for (let i = 0; i < photoUrl.length; i++) {
        photoUrl[i].photo = SERVER_URL_WITHOUT_PRONAME + photoUrl[i].photo
      }
      _this.setData({
        videoList: photoUrl,
        videoTotalPage: res.data.page.totalPage,
        videoCurrentPage: res.data.page.currentPage
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    },
    res => {
      wx.showToast({
        title: '服务器繁忙，请稍后再试',
        icon: 'none',
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }
  )
}

Page({
  data: {
    isMainChartDisplay: true,
    winHeight: "",  //窗口高度
    currentTab: 0,  //预设当前项的值
    scrollLeft: 0,   //tab标题的滚动条位置

    allList: [],  // "全部" 列表
    jobsList: [],   // "组织工作" 列表
    educationList: [],   // "党建教育" 列表
    videoList: [],   // "党建视频" 列表

    allCurrentPage: 1,  // "全部" 当前页码
    allTotalPage: 1,    // "全部" 总页数

    jobsCurrentPage: 1, // "组织工作" 当前页码
    jobsTotalPage: 1,   // "组织工作" 总页数

    educationCurrentPage: 1,   // "党建教育" 当前页码
    educationTotalPage: 1,    // "党建教育" 总页数

    videoCurrentPage: 1,    // "党建视频" 当前页码
    videoTotalPage: 1   // "党建视频" 总页数
  },
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
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

    // 根据不同的currentTab类型发送不同的请求
    if (this.data.currentTab == 1) {
      jobsReq(this)
    } else if (this.data.currentTab == 2) {
      educationReq(this)
    } else if (this.data.currentTab == 3) {
      videoReq(this)
    } else if (this.data.currentTab == 0) {
      allReq(this)
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
    allReq(this)  // 请求所有列表
  },

  // 下拉刷新方法
  onPullDownRefresh: function() {
    wx.showNavigationBarLoading()
    if (this.data.currentTab == 1) {
      jobsReq(this)
    } else if (this.data.currentTab == 2) {
      educationReq(this)
    } else if (this.data.currentTab == 3) {
      videoReq(this)
    } else if (this.data.currentTab == 0) {
      allReq(this)
    }
  }
});