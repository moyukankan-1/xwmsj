// pages/active/active.js
import { getSystem } from "../../api/api.js"

//引入app
const app = getApp()

//引入外部md5加密js文件
var utilMd5 = require('../../utils/md5.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //活动列表
    list: [],
    //筛选的name
    name: [],
    wish: 213
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userId = app.globalData.userId
    let sessionId = app.globalData.sessionId
    let cityCode = app.globalData.cityCode
    let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)
    //收索关键字
    let searchKey = ""
    //活动状态
    let activityStateId = -1
    //地区
    let areaId = -1
    //服务类型
    let serviceTypeId = -1
    //服务对象
    let serviceObjectId = -1
    //数量
    let pageSize = 10
    //当前页码
    let currPage = 1

    let obj = Object.keys(options)
    if (obj.length == 0 ) {
      getSystem("https://www.jnxsdwmsj.com/api/ActivityInterface/getActivityList", { userId, sessionId, cityCode, token, searchKey, activityStateId, areaId, serviceTypeId, serviceObjectId, pageSize, currPage }, res => {
        if (res.data.code == 0) {
          this.setData({
            list: res.data.data.list
          })
        } else if (res.data.code == 1) {
          wx: wx.showToast({
            title: res.data.info,
            icon: 'none'
          })
        }
      })
    }else {
      let activityStateId = options.a
      let areaId = options.b
      let serviceTypeId = options.c
      let serviceObjectId = options.d

      //赋值给全局变量
      app.globalData.activityStateId = options.a
      app.globalData.areaId = options.b
      app.globalData.serviceTypeId = options.c
      app.globalData.serviceObjectId = options.d

      //过滤掉没有选择的选项
      let num = options.e.filter(function(x) {
        if(x.name != "") {
          return x
        }
      })
      this.setData({
        name: num
      })

      getSystem("https://www.jnxsdwmsj.com/api/ActivityInterface/getActivityList", { userId, sessionId, cityCode, token, searchKey, activityStateId, areaId, serviceTypeId, serviceObjectId, pageSize, currPage }, res => {
        if (res.data.code == 0) {
          this.setData({
            list: res.data.data.list
          })
        } else if (res.data.code == 1) {
          wx: wx.showToast({
            title: res.data.info,
            icon: 'none'
          })
        }
      })
    }

    
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