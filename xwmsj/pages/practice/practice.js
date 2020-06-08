// pages/practice/practice.js
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
    list: [],
    title: [
      {
        id: -1,
        name: "全部"
      },
      {
        id: 1,
        name: "中心"
      },
      {
        id: 2,
        name: "分中心"
      },
      {
        id: 3,
        name: "站点"
      }
    ],
    idx: 0
  },
  _tap(e) {
    this.setData({
      idx: e.currentTarget.id
    })

    let userId = wx.getStorageSync("list").userId
    let sessionId = wx.getStorageSync("list").sessionid
    let cityCode = wx.getStorageSync("list").shi_id
    let token = utilMd5.hexMD5(userId + sessionId + cityCode + "jiudianlianxian" + app.globalData.format)
    let positionName = ""
    let positionType = this.data.title[e.currentTarget.id].id
    let pageSize = 10
    let currPage = 1
    getSystem("https://www.jnxsdwmsj.com/api/PositionInterface/getPositionList", { userId, sessionId, cityCode, token, positionName, positionType, pageSize, currPage }, res => {
      if (res.data.code == 0) {
        this.setData({
          list: res.data.data.list
        })
      }
    })
  },
  _practive(e) {
    let userId = wx.getStorageSync("list").userId
    let sessionId = wx.getStorageSync("list").sessionid
    let cityCode = wx.getStorageSync("list").shi_id
    let token = utilMd5.hexMD5(userId + sessionId + cityCode + "jiudianlianxian" + app.globalData.format)
    let positionId = this.data.list[e.currentTarget.id].positionId
    getSystem("https://www.jnxsdwmsj.com/api/PositionInterface/getPositionInfo", { userId, sessionId, cityCode, token, positionId},res => {
      if(res.data.code == 0) {
        let practiveDetails = res.data.data
        wx.navigateTo({
          url: '/pages/practiveDetails/practiveDetails',
          success: function (res) {
            res.eventChannel.emit('acceptDataFromOpenerPage', practiveDetails)
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userId = wx.getStorageSync("list").userId
    let sessionId = wx.getStorageSync("list").sessionid
    let cityCode = wx.getStorageSync("list").shi_id
    let token = utilMd5.hexMD5(userId + sessionId + cityCode + "jiudianlianxian" + app.globalData.format)
    let positionName = ""
    let positionType = -1
    let pageSize = 10
    let currPage = 1
    getSystem("https://www.jnxsdwmsj.com/api/PositionInterface/getPositionList", { userId, sessionId, cityCode, token, positionName, positionType, pageSize, currPage},res => {
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