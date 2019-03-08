import { PICTURE, SERVER_URL, BASE_URL_TU } from '../../utils/path.js'
import { requestAboutNews } from '../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoList: []   // 照片列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    requestAboutNews(
      PICTURE,
      { id: e.id },
      res => {
        let tempList = [...res.data.lookdetailsList.list]
        for (let i = 0; i < tempList.length; i++) {
          tempList[i].name = SERVER_URL + tempList[i].name
        }
        this.setData({
          photoList: tempList
        })
        console.log(this.data.photoList)
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    )
  }
})