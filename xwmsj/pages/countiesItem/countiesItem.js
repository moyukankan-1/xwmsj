// pages/countiesItem/countiesItem.js
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
    areaId:0,
    columnId: 0,
    list: [],
    listItem: [],
    item: [],
    scrollX: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (data,is,list) => {
      this.setData({
        areaId: data,
        columnId: is,
        list: list,
        item: list[0].subColumnList
      })
    })

    let userId = app.globalData.userId
    let sessionId = app.globalData.sessionId
    let cityCode = app.globalData.cityCode
    let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)
    let areaId = this.data.areaId
    let columnId = this.data.columnId
    let pageSize = 10
    let currPage = 1

    getSystem("https://www.jnxsdwmsj.com/api/CountyInterface/getNewsList", { userId, sessionId, cityCode, token, areaId, columnId, pageSize, currPage},res => {
      if(res.data.code == 0) {
        this.setData({
          listItem: res.data.data.list
        })
      }else if(res.data.code == 1) {
        wx:wx.showToast({
          title: res.data.info,
          icon: 'none'
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