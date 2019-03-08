// 下拉或是点击按钮获取更多的信息

// 扩充数据列表的方法，一般与“加载更多”方法配合使用
export const expansionDataList = function (pageDataList, resDataList, prefix) {
  let tempList = [...pageDataList]
  for (let i = 0; i < resDataList.length; i++) {
    resDataList[i].photo = prefix + resDataList[i].photo
    tempList.push(resDataList[i])
  }
  return tempList
}

/* 
  @ currentPage: 当前页码
  @ totalPage： 总页码
  @ url： 请求路径
  @ data：请求参数
  @ success: 成功回调函数
 */
export const getMoreWithPullUp = function(currentPage, totalPage, url, data, success) {
  if (currentPage < totalPage) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: url,
      data: data,
      success(res) {
        wx.hideLoading()
        success(res)
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          title: '服务器繁忙，请稍后再试',
          icon: 'none'
        })
      }
    })
  } else {
    wx.showToast({
      title: '没有更多数据了',
      icon: 'none'
    })
  }
}