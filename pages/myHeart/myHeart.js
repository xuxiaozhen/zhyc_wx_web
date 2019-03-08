// 引入接口路径
import {
  MYHEART,
  ADDHEART
} from '../../utils/path.js'

Page({
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
  /**
   * 页面的初始数据
   */
  data: {
    myheartlist:[],
    title:"",
    content:"",
    totalpage:1,//总页数
currentPage:1, //当前页数
    heartMsg:{}
  },
  bindViewTapHeartPerson:function(){
    wx.navigateTo({
      url: '../personal/personal',
    })
  },

  // 上拉(点击按钮)列表加载更多数据
  getMore: function () {
    //polingcurrentPage: res.data.page.totalPage
    if (this.data.currentPage < this.data.totalpage) {
      wx.request({
        url: MYHEART,
        data: {
          pageIndex: this.data.totalpage + 1,
        },
        success: res => {
          let tempList = [...this.data.myheartlist]
          for (let i = 0; i < res.data.list.length; i++) {
            tempList.push(res.data.list[i])
          }
          this.setData({
            myheartlist: tempList,
            currentPage: res.data.page.currentPage
          })
          console.log(this.data.myheartlist)
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
  onLoad: function (options) {
    wx.request({
      url: MYHEART,
      data:{
        currentPage: 1, // 当前页码
        pageRecord: 1,  // 总页数
      },
      success: res => {
        this.setData({
          myheartlist: res.data.list,
          totalpage: res.data.page.totalPage
        })
        console.log(res.data)
        console.log(this.myheartlist)
        console.log(this.data.totalpage)
      }
    })
  },
  //双向绑定标题
  getTitle: function (options) {
    this.setData({
      title: options.detail.value
    })
  },
  //双向绑定内容
  getContent: function (options) {
    this.setData({
      content: options.detail.value
    })

  },
sunmit1:function(){
  wx.showModal({
    title: '提示',
    content: '确定',
    success(res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
},

  //点击提交
  submit: function (options) {
    let title = this.data.title
    let content = this.data.content
    wx.request({
      url: ADDHEART,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        title: title,
        content: content
      },
      success: res => {
        this.setData({
          heartMsg: res.data
        })
        console.log("111",res)
        //console.log("11", this.data.content)
      }
    })
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