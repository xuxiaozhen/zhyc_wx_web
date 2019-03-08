// pages/commemorate/commemorate.js
import{
  COMMEMORATE
} from '../../utils/path.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  userinfo:{},
  wxchat:'',
  enterparty:"",
  day:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 //根据登陆
        this.setData({
          userinfo: wx.getStorageSync('userInfo')
        })
        console.log(this.data.userinfo)

//得到入党日期
    var joinDate = this.data.userinfo.enterparty
    var day=""
    //判断如果入党日期
    if (joinDate===null){
      day =0;
      }else{
        //日期转化成date并进行相减得到入党天数
      var start_date = new Date(joinDate);
      var end_date = new Date();
      var days = end_date.getTime() - start_date.getTime();
       day = parseInt(days / (1000 * 60 * 60 * 24));
    }
    this.setData({
      day: day
    })
      console.log(day) 
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