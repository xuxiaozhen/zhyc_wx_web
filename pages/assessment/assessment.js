import { EXAMINATION } from '../../utils/path.js'
import { requestAboutNews } from '../../utils/request.js'
import * as echarts from '../../ec-canvas/echarts';

var barChart;  // 月度
var scatterChart  // 季度和年度

// 月度 调用数据接口方法
var mouthReq = _this => {
  let that = _this
  requestAboutNews(
    EXAMINATION, { mode: 1, },  //月度 
    res => {
      _this.setData({
        valueList: res.data.valueList
      })
      setTimeout(() => {
        barChart.setOption({
          series: [{
            data: that.data.valueList,
            type: 'bar'
          }]
        })
      }, 1000)
    }
  )
}
// 季度 调用数据接口方法
var seasonReq = _this => {
  let that = _this
  requestAboutNews(
    EXAMINATION, { mode: 2, },  //月度 
    res => {
      _this.setData({
        valueList: res.data.valueList
      })
      setTimeout(() => {
        barChart.setOption({
          series: [{
            data: that.data.valueList,
            type: 'bar'
          }]
        })
      }, 1000)
    }
  )
}

Page({
  data: {
    valueList:[], 
    evaluationRule:{},
    
    winHeight: "",  //窗口高度
    currentTab: 0,  //预设当前项的值
    scrollLeft: 0  , //tab标题的滚动条位置
   
    // 月度柱状图相关设置
    ecBar: {
      onInit: function (canvas, width, height ) {
        //
        barChart = echarts.init(canvas, null, {
          width: width,
          height: height,
        });
        canvas.setChart(barChart);
        barChart.setOption(getBarOption());
        return barChart;
      }
    },
    
    // 年度和季度
    ecScatter: {
      onInit: function(canvas, width, height) {
        const scatterChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(scatterChart);
        scatterChart.setOption(getScatterOption());
        return scatterChart;
      }
    }
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
    })

    // 调用接口接收数据( )
    mouthReq(this)  // 月度数据接口调用
  }
});
//月度柱状图方法
function getBarOption() {
  return {
    color: ['#E84A4C', '#E84A4C', '#E84A4C'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ["活动", "学习", "考试"]
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [],
      type: 'bar'
    }]
  }
}

function getScatterOption() {

  var axisCommon = {
    axisLabel: {
      textStyle: {
        color: '#C8C8C8'
      }
    },
    axisTick: {
      lineStyle: {
        color: '#fff'
      }
    },
    axisLine: {
      lineStyle: {
        color: '#C8C8C8'
      }
    },
    splitLine: {
      lineStyle: {
        color: '#C8C8C8',
        type: 'solid'
      }
    }
  };

  return {
    color: ["#FF7070", "#60B6E3"],
    backgroundColor: '#eee',
    xAxis: {
      type: 'category',
      data: ["活动", "学习", "考试"]
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [120, 200, 150],
      type: 'bar'
    }],
    animationDelay: function(idx) {
      return idx * 50;
    },
    animationEasing: 'elasticOut'
  };
}