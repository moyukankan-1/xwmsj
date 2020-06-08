// pages/releaseWish/releaseWish.js
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
    leftName: "",
    rightName: "",
    title: "",
    content: "",
    shiId: 0,
    zhenjieId: 0,
    contactsName: "",
    contactNumber: "",
    contactAddress: ""
  },
  _address() {
    wx.navigateTo({
      url: '/pages/applyArea/applyArea'
    })
  },
  _input1(e) {
    this.setData({
      title: e.detail.value
    })
  },
  _input2(e) {
    this.setData({
      content: e.detail.value
    })
  },
  _input3(e) {
    this.setData({
      contactsName: e.detail.value
    })
  },
  _input4(e) {
    this.setData({
      contactNumber: e.detail.value
    })
  },
  _input5(e) {
    this.setData({
      contactAddress: e.detail.value
    })
  },
  _submit() {
    let userId = wx.getStorageSync("list").userId
    let sessionId = wx.getStorageSync("list").sessionid
    let cityCode = wx.getStorageSync("list").shi_id
    let token = utilMd5.hexMD5(userId + sessionId + cityCode + "jiudianlianxian" + app.globalData.format)
    let title = this.data.title
    let content = this.data.content
    let xianquId = app.globalData.leftId
    let zhenjieId = app.globalData.rightId
    let contactsName = this.data.contactsName
    let contactNumber = this.data.contactNumber
    let contactAddress = this.data.contactAddress
    getSystem("https://www.jnxsdwmsj.com/api/PersonalInterface/setMyWish", { userId, sessionId, cityCode, token, title, content, xianquId, zhenjieId, contactsName, contactNumber, contactAddress},res => {
      if(res.data.code == 0) {
        wx.showToast({
          title: res.data.info,
        })
        setTimeout(() => {
          wx.navigateBack()
        },1000)
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
    this.setData({
      leftName: app.globalData.leftName,
      rightName: app.globalData.rightName
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