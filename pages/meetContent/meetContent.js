var WxParse = require('../../wxParse/wxParse.js')
import {
  MEETMANY
} from '../../utils/path.js'
import { requestAboutNews } from '../../utils/request.js'
Page({
  data: {
    isMainChartDisplay: true,
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0 ,//tab标题的滚动条位置
    JoinmeetList:[], //已参与会议列表
  UnJoinmeetList:[]   //未参与回忆列表
  },
  switchTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function(e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
      
      if (this.data.currentTab == 0) {
        // 未参与会议
        wx.request({
          url: MEETMANY,
          data:{
            signType: 0,
            personid: wx.getStorageSync('userInfo').id
          },
          success: res => {
            this.setData({
              UnJoinmeetList: res.data.mettingList,
        
            })
            let article = res.data.mettingList.content
            WxParse.wxParse('article', 'html', article, this, 5)
            console.log(res)
          },
          fail: res => {
            wx.showToast({
              title: '服务器繁忙，请稍后再试',
              icon: 'none',
            })
          }
        })
          
      }
    } 
     

  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function() {
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
  onLoad: function() {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function(res) {
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

    // 调用接口接收数据( )
    requestAboutNews(
      MEETMANY,
      { signType: 1,
        personid: wx.getStorageSync('userInfo').id
       },
      res => {
        this.setData({
          JoinmeetList: res.data.mettingList,
        })
        let article = res.data.mettingList.easyContent
        WxParse.wxParse('article', 'html', article, this, 5)
        console.log(333,res.data)
       console.log(this.data.JoinmeetList)
      },
      res => {
        wx.showToast({
          title: '服务器繁忙，请稍后再试',
          icon: 'none',
        })
      }
    )
  }


  
});