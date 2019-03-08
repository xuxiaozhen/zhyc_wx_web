/* 封装一些关于请求的方法 */

// 适用于普通的GET请求
/* 
  @ url: 请求路径
  @ data: 请求参数
  @ success: 成功回调
  @ fail: 失败回调
 */
export const requestAboutNews = function (url, data, success) {
  // 加载动画
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: url,
    data: data,
    success(res) {
      wx.hideLoading()
      success(res)
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    },
    fail: function() {
      wx.hideLoading()
      wx.showToast({
        title: '服务器繁忙，请稍后再试',
        icon: 'none'
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }
  })
}


// 封装的POST请求的方法————参上和上面的GET方法的所需一致
export const requestWithPost = function (url, data, success, fail) {
  // 加载动画
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: url,
    data: data,
    method: 'POST',
    header: { "Content-Type": "application/x-www-form-urlencoded" },
    success(res) {
      wx.hideLoading()
      success(res)
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    },
    fail: function () {
      wx.hideLoading()
      wx.showToast({
        title: '服务器繁忙，请稍后再试',
        icon: 'none'
      })
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }
  })
}

// 判断登录状态
export const isLogin = function() {
   wx.getStorage({
    key: 'userInfo',
    success: function (res) {
      console.log('欢迎您，' + wx.getStorageSync('userInfo').name)
    },
    fail() {
      wx.navigateTo({
        url: '../../pages/login/login',
      })
    }
  })
}