import { requestAboutNews } from '../../utils/request.js'
import { TESTINFO, SAVETEST } from '../../utils/path.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    quectionList: [],  // 所有的考试题目（一共是10题）
    index: 0,  // 索引
    answer: '',  // 每道题选择的答案
    examid: 1,  // 试卷ID
    checkStatus: 1   // 单选框的选择状态
  },

  // 下一题按钮
  nextQue: function(e) {
    let that = this
    let examid = this.data.examid   // 试卷ID
    let queid = e.currentTarget.dataset.id  // 试题ID
    let score = parseInt(e.currentTarget.dataset.score)   // 题目的分值
    let answer = this.data.answer  // 用户答案
    let submitStatus = '0'  // 提交状态
    let true_option = e.currentTarget.dataset.trueop   // 试题的正确答案
    this.setData({
      index: that.data.index + 1,
      checkStatus: 0
    })
    // 判断用户的答案类型是单选还是多选类型（string为单选，数组为多选）
    if(typeof answer === 'object' && answer instanceof Array) {
      answer = answer.join()
    }
    // 寄存答案的请求
    console.log(answer)
    requestAboutNews(
      SAVETEST,
      { examid, queid, score, answer, submitStatus, true_option },
      res => {
        console.log(res)
      }
    )
  },

  // 交卷方法
  submit: function() {
    let that = this
    let examid = this.data.examid   // 试卷ID
    let queid = e.currentTarget.dataset.id  // 试题ID
    let score = parseInt(e.currentTarget.dataset.score)   // 题目的分值
    let answer = this.data.answer  // 用户答案
    let submitStatus = '1'  // 提交状态
    // 交卷的请求（与上面的下一题类似）
    requestAboutNews(
      SAVETEST,
      { examid, queid, score, answer, submitStatus, true_option },
      res => {
        console.log(res)
      }
    )
  },

  // 上一题按钮
  lastQue: function() {
    let that = this
    this.setData({
      index: that.data.index - 1
    })
  },

  // 家园

  // 选择的答案
  selectAnswer: function(e) {
    this.setData({
      answer: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    requestAboutNews(
      TESTINFO, { examid: e.id },
      res => {
        this.setData({
          quectionList: res.data.queList,
          examid: e.id
        })
        console.log(this.data.quectionList)
      }
    )
  }
})