// 引入接口路径
import {
  ARTICLELIST,
  EDUCATION,
  THREE_LESSON,
  THREE_LESSONNOTE
} from '../../utils/path.js'
import { requestAboutNews, getMoreRequest } from '../../utils/request.js'

var app = getApp();
Page({
  data: {
    currentData: 0,
    isMainChartDisplay: true,
    winHeight: "",//窗口高度
    currentTab: 1, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置

    // 微党课数据列表
    partyLessonList: [],
    //三会一课数据列表
    threeLessonList: [],
    //三会一课会议通知列表数据
    threeLessonNoteList: [],
    // 专题教育数据列表
    educationList: [],
    // 反腐倡廉数据列表
    integrityList: [],
    // 政策法规数据列表
    legislationList: [],
    personid: '',

    partyLessonTotalPage: 1,  // 微党课当前页数
    partyLessoncurrentPage: 1  // 微党课总页面
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

    // 根据不同的"currentTab"，来发出不同type的请求
    if (this.data.currentTab == 1) {
      // 三会一课

      // requestAboutNews(
      //   THREE_LESSON,
      //   res => {
      //     this.setData({
      //       threeLessonList: res.data.list,
      //     })
      //     console.log(res)
      //     console.log(this.data.threeLessonList)
      //   },
      //   res => {
      //     wx.showToast({
      //       title: '服务器繁忙，请稍后再试',
      //       icon: 'none',
      //     })
      //   }
      // )
      wx.request({
        url: THREE_LESSON,
        success: res => {
          this.setData({
            threeLessonList: res.data.list,
          })
          console.log(res.data)
          console.log(this.data.threeLessonList)
        }
      })

    }
    else if (this.data.currentTab == 2) {
      // 教育专题
      if (this.data.educationList.length === 0) {
        requestAboutNews(
          ARTICLELIST,
          { type: 4 },
          res => {
            this.setData({
              educationList: res.data.list,
            })
          },
          res => {
            wx.showToast({
              title: '服务器繁忙，请稍后再试',
              icon: 'none',
            })
          }
        )
      }
    } else if (this.data.currentTab == 3) {
      // 反腐倡廉
      if (this.data.integrityList.length === 0) {
        requestAboutNews(
          ARTICLELIST,
          { type: 5 },
          res => {
            this.setData({
              integrityList: res.data.list,
            })
          },
          res => {
            wx.showToast({
              title: '服务器繁忙，请稍后再试',
              icon: 'none',
            })
          }
        )
      }
    } else if (this.data.currentTab == 4) {
      // 政策法规
      if (this.data.legislationList.length === 0) {
        requestAboutNews(
          ARTICLELIST,
          { type: 6 },
          res => {
            this.setData({
              legislationList: res.data.list,
            })
          },
          res => {
            wx.showToast({
              title: '服务器繁忙，请稍后再试',
              icon: 'none',
            })
          }
        )
      }
    }

  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 2) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  //事件处理函数
  bindtabView: function () {
    wx.navigateTo({
      url: '../../pages/meetNote/meetNote'
    })
  },
  bindtabViewSchool: function () {
    wx.reLaunch({
      url: '../../pages/partySchool/partySchool'
    })
  },
  bindViewTabTest: function () {
    wx.navigateTo({
      url: '../recruit/recruit',
    })
  },

  // 上拉触底时间
  onReachBottom: function (res) {
    wx.showToast({
      title: 'Test'
    })
  },

  // 上拉(点击按钮)列表加载更多数据
  getMore: function () {
    if (this.data.partyLessoncurrentPage < this.data.partyLessonTotalPage) {
      wx.request({
        url: ARTICLELIST,
        data: {
          type: 3,
          pageIndex: this.data.partyLessoncurrentPage + 1,
        },
        success: res => {
          let tempList = [...this.data.partyLessonList]
          for (let i = 0; i < res.data.list.length; i++) {
            tempList.push(res.data.list[i])
          }
          this.setData({
            partyLessonList: tempList,
            partyLessoncurrentPage: res.data.page.currentPage
          })
          console.log(this.data.partyLessonList)
        }
      })
    } else {
      wx.showToast({
        title: '没有更多数据了',
        icon: 'none'
      })
    }
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current

      })
      console.log(this.data.currentData)

    }
    //  if (this.data.currentData===1){
    wx.request({
      url: THREE_LESSON,
      data: {
        personid: wx.getStorageSync('userInfo').id
      },
      success: res => {
        this.setData({
          threeLessonList: res.data.list,
        })
        console.log(res.data)
        console.log(this.data.threeLessonList)
      }
    })
    //  } else if (this.data.currentData==0){
    // 三会一课
    wx.request({
      url: THREE_LESSONNOTE,
      data: {
        personid: wx.getStorageSync('userInfo').id
      },
      success: res => {
        this.setData({
          threeLessonNoteList: res.data.list,
        })
        console.log(res.data)
        console.log(this.data.threeLessonNoteList)
      }
    })
    //  }

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

    // 调用接口接收数据(微党课)
    requestAboutNews(
      ARTICLELIST,
      { type: 3 },
      res => {
        this.setData({
          partyLessonList: res.data.list,
          partyLessonTotalPage: res.data.page.totalPage
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
  footerTap: app.footerTap
})
