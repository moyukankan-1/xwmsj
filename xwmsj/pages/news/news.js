// pages/news/news.js
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
    idx: 0,
    title: [
      {
        id: -1,
        name: "全部"
      },
      {
        id: 1,
        name: "未读"
      },
      {
        id: 2,
        name: "已读"
      },
    ],
    list: [],
    details: {},
    none: "block"
  },
  _active(e) {
    this.setData({
      idx: e.currentTarget.id
    })

    let userId = wx.getStorageSync("list").userId
    let sessionId = wx.getStorageSync("list").sessionid
    let cityCode = wx.getStorageSync("list").shi_id
    let token = utilMd5.hexMD5(userId + sessionId + cityCode + "jiudianlianxian" + app.globalData.format)
    let searchKey = ""
    let state = this.data.title[this.data.idx].id
    let pageSize = 10
    let currPage = 1

    getSystem("https://www.jnxsdwmsj.com/api/PersonalInterface/getMessageList", { userId, sessionId, cityCode, token, searchKey, state, pageSize, currPage }, res => {
      if (res.data.code == 0) {
        this.setData({
          list: res.data.data.list
        })
        if (this.data.list.length == 0) {
          this.setData({
            none: "block"
          })
        } else {
          this.setData({
            none: "none"
          })
        }
      }
    })
  },
  _news(e) {
    let userId = wx.getStorageSync("list").userId
    let sessionId = wx.getStorageSync("list").sessionid
    let cityCode = wx.getStorageSync("list").shi_id
    let token = utilMd5.hexMD5(userId + sessionId + cityCode + "jiudianlianxian" + app.globalData.format)
    let noticeId = this.data.list[e.currentTarget.id].noticeId
    getSystem("https://www.jnxsdwmsj.com/api/PersonalInterface/getMessageInfo", { userId, sessionId, cityCode, token, noticeId},res => {
      if(res.data.code == 0) {
       this.setData({
         details: res.data.data
       }) 
       let details = this.data.details
        wx.navigateTo({
          url: '/pages/newsDetails/newsDetails',
          success: function (res) {
            res.eventChannel.emit('acceptDataFromOpenerPage',details)
          }
        })
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let userId = wx.getStorageSync("list").userId
    let sessionId = wx.getStorageSync("list").sessionid
    let cityCode = wx.getStorageSync("list").shi_id
    let token = utilMd5.hexMD5(userId + sessionId + cityCode + "jiudianlianxian" + "20200326")
    let searchKey = ""
    let state = this.data.title[this.data.idx].id
    let pageSize = 10
    let currPage = 1

    getSystem("https://www.jnxsdwmsj.com/api/PersonalInterface/getMessageList", { userId, sessionId, cityCode, token, searchKey, state, pageSize, currPage},res => {
      if(res.data.code == 0) {
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