// pages/message/message.js
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
    articles: [],
    articleItems: [],
    scrollY: true,
    type: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userId = app.globalData.userId
    let sessionId = app.globalData.sessionId
    let cityCode = app.globalData.cityCode
    let token = utilMd5.hexMD5(sessionId + userId + cityCode + "jiudianlianxian" + app.globalData.format)
    //首页类型
    let type = this.data.type
    getSystem("https://www.jnxsdwmsj.com/api/NewsInterface/getNewsClass", { userId, sessionId, cityCode, token, type }, res => {
      if (res.data.code == 0) {
        this.setData({
          articles: res.data.data
        })
      } else if (res.data.code == 1) {
        wx.showToast({
          title: res.data.code,
          icon: "none"
        })
      }
    })
    //文章列表-----
    //初始加载栏目Id
    let columnId = 3
    //初始显示的数量
    let pageSize = 10
    //当前页码
    let currPage = 1
    getSystem("https://www.jnxsdwmsj.com/api/NewsInterface/getNewsList", { userId, sessionId, cityCode, token, type, columnId, pageSize, currPage }, res => {
      if (res.data.code == 0) {
        this.setData({
          articleItems: res.data.data.list
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