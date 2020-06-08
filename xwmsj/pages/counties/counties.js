// pages/counties/counties.js
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
    //县区列表
    list: [],
    //县区文章列表
    listItem: [],
    //县区文章子栏目
    item: []
  },
  _countiesList(e) {
    let userId = app.globalData.userId
    let sessionId = app.globalData.sessionId
    let cityCode = app.globalData.cityCode
    let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)

    let idx = e.currentTarget.id
    let areaId = this.data.list[idx].areaId
    app.globalData.areaId = areaId
    getSystem("https://www.jnxsdwmsj.com/api/CountyInterface/getNewsClass", { userId, sessionId, cityCode, token,areaId },res => {
      console.log(res)
      if (res.data.code == 0) {
        this.setData({
          listItem: res.data.data,
          item: res.data.data.subColumnList
        })
        let columnId = this.data.listItem[idx-1].columnId
        let list = this.data.listItem
        let item = this.data.item
        wx.navigateTo({
          url: '/pages/countiesItem/countiesItem',
          success: function (res) {
            res.eventChannel.emit('acceptDataFromOpenerPage',  areaId,columnId,list)
          } 
        })
      } else if (res.data.code == 1) {
        wx.showToast({
          title: res.data.info,
          icon: 'none'
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userId = app.globalData.userId
    let sessionId = app.globalData.sessionId
    let cityCode = app.globalData.cityCode
    let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)

    getSystem("https://www.jnxsdwmsj.com/api/CountyInterface/getCountyList", { userId, sessionId, cityCode,token},res => {
      if(res.data.code == 0) {
        this.setData({
          list: res.data.data
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