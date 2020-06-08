// pages/applyArea/applyArea.js
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
    //左侧地区名称
    list: [],
    //右侧地区名称
    twoList:[],
    idx: 0,
    itemIdx: 0,
    leftName: "",
    rightName: "",
    leftId: 0,
    rightId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userId = app.globalData.userId
    let sessionId = app.globalData.sessionId
    let cityCode = app.globalData.cityCode
    let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)
    getSystem("https://www.jnxsdwmsj.com/api/SystemInterface/getLocationList", { userId, sessionId, cityCode, token }, res => {
      console.log(res)
      if (res.data.code == 0) {
        this.setData({
          list: res.data.data[0].subLocationList,
          twoList: res.data.data[0].subLocationList[0].subLocationList
        })
      } else if (res.data.code == 1) {
        wx: wx.showToast({
          title: res.data.info,
          icon: 'none'
        })
      }
    })
  },
  _leftloc(e) {
    this.setData({
      idx: e.currentTarget.id,
      twoList: this.data.list[e.currentTarget.id].subLocationList,
    })
  },
  _rightloc(e) {
    this.setData({
      itemIdx: e.currentTarget.id,
      leftName: this.data.list[e.currentTarget.id].locationName,
      rightName: this.data.list[this.data.idx].subLocationList[e.currentTarget.id].locationName,
      leftId: this.data.list[e.currentTarget.id].locationId,
      rightId: this.data.list[this.data.idx].subLocationList[e.currentTarget.id].locationId
    })
    app.globalData.leftName = this.data.leftName
    app.globalData.rightName = this.data.rightName
    app.globalData.leftId = this.data.leftId
    app.globalData.rightId = this.data.rightId
    
    wx.navigateBack()

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