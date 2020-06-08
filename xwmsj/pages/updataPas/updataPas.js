// pages/updataPas/updataPas.js
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
    oldPassword: "",
    newPassword: "",
    conPassword: ""
  },
  _oldInput(e) {
    this.setData({
      oldPassword: e.detail.value
    })
  },
  _newInput(e) {
    this.setData({
      newPassword: e.detail.value
    })
  },
  _conInput(e) {
    this.setData({
      conPassword: e.detail.value
    })
  },
  _submit() {
    let userId = wx.getStorageSync("list").userId
    let sessionId = wx.getStorageSync("list").sessionid
    let cityCode = wx.getStorageSync("list").shi_id
    let token = utilMd5.hexMD5(userId + sessionId + cityCode + "jiudianlianxian" + app.globalData.format)
    let oldPassword = utilMd5.hexMD5(this.data.oldPassword)
    let newPassword = utilMd5.hexMD5(this.data.newPassword)
    console.log(oldPassword)
    getSystem("https://www.jnxsdwmsj.com/api/PersonalInterface/updatePassowrd", { userId, sessionId, cityCode, token, oldPassword, newPassword},res => {
      if(res.data.code == 0) {
        wx.showToast({
          title: res.data.info
        })
        wx.navigateBack()
      }else if(res.data.code == 1) {
        wx.showToast({
          title: res.data.info,
          icon: "none"
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