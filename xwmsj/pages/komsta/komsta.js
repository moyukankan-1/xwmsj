// pages/komsta/komsta.js
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
    title: "全部团队",
    list: [],
    wish: 456,
    opd: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //第一次加载清除本地缓存
    wx.removeStorage({
      key: 'a',
    })
    wx.removeStorage({
      key: 'b',
    })
    wx.removeStorage({
      key: 'c',
    })
    wx.removeStorage({
      key: 'd',
    })
    let userId = app.globalData.userId
    let sessionId = app.globalData.sessionId
    let cityCode = app.globalData.cityCode
    let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)
    let searchKey = ""
    let areaId = -1
    let serviceTypeId = -1
    let pageSize = 10
    let currPage = 1
    getSystem("https://www.jnxsdwmsj.com/api/TeamInterface/getTeamList", { userId, sessionId, cityCode, token, searchKey, areaId, serviceTypeId, pageSize, currPage},res => {
      if(res.data.code == 0) {
        this.setData({
          list: res.data.data.list
        })
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
    if (wx.getStorageSync("d") == 456) {
      app.globalData.areaId = wx.getStorageSync("a")
      app.globalData.serviceTypeId = wx.getStorageSync("b")
      this.setData({
        opd: wx.getStorageSync("c")
      })
    }
    // 过滤掉没有选择的选项
    if (wx.getStorageSync("c")) {
      let num = wx.getStorageSync("c").filter(function (x) {
        if (x.name != "") {
          return x
        }
      })
      this.setData({
        opd: num
      })
    }
    let userId = app.globalData.userId
    let sessionId = app.globalData.sessionId
    let cityCode = app.globalData.cityCode
    let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)
    let searchKey = ""
    let areaId = app.globalData.areaId
    let serviceTypeId = app.globalData.serviceTypeId
    let pageSize = 10
    let currPage = 1
    getSystem("https://www.jnxsdwmsj.com/api/TeamInterface/getTeamList", { userId, sessionId, cityCode, token, searchKey, areaId, serviceTypeId, pageSize, currPage }, res => {
      if (res.data.code == 0) {
        this.setData({
          list: res.data.data.list
        })
      }
    })
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