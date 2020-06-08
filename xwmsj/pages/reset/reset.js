// pages/reset/reset.js
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
    mobile: 0,
    verification: 0,
    password: 0,
    conPassword: 0,
    //验证码状态
    verState: "获取验证码"
  },
  _mobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  _verification(e) {
    this.setData({
      verification: e.detail.value
    })
  },
  _password(e) {
    this.setData({
      password: e.detail.value
    })
  },
  _conPassword(e) {
    this.setData({
      conPassword: e.detail.value
    })
  },
  _submit() {
    let userId = wx.getStorageSync("list").userId
    let sessionId = wx.getStorageSync("list").sessionid
    let cityCode = wx.getStorageSync("list").shi_id
    let token = utilMd5.hexMD5(userId + sessionId + cityCode + "jiudianlianxian" + app.globalData.format)
    let mobile = this.data.mobile
    let password = utilMd5.hexMD5(this.data.password)
    let validateCode = utilMd5.hexMD5(this.data.verification)
    getSystem("https://www.jnxsdwmsj.com/api/LoginInterface/resetPassword", { userId, sessionId, cityCode, token, mobile, password, validateCode},res => {
      if(res.data.code == 0) {
        if(this.data.password == this.data.conPassword) {
          wx.showToast({
            title: res.data.info
          })
          wx.navigateBack()
        }else {
          wx.showToast({
            title: '两次输入密码不一致!',
            icon: "none"
          })
        }
      }else if(res.data.code == 1) {
        wx.showToast({
          title: res.data.info,
          icon: "none"
        })
      }
    })
  },
  _dedao() {
    let userId = app.globalData.userId
    let sessionId = app.globalData.sessionId
    let cityCode = app.globalData.cityCode
    let token = utilMd5.hexMD5(sessionId + userId + cityCode + "jiudianlianxian" + app.globalData.format)
    let mobile = this.data.mobile
    getSystem("https://www.jnxsdwmsj.com/api/RegisterInterface/sendCode", { userId, sessionId, cityCode, token, mobile},res => {
      if(res.data.code == 0) {
        wx.showToast({
          title: res.data.info
        })
        let i = 60
        setInterval(() => {
          i--
          if(i < 0) {
            this.setData({
              verState: "获取验证码"
            })
            return
          }else {
            this.setData({
              verState: `重新获取${i}`
            })
          }
        },1000)
      }else if(res.data.code == 1){
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