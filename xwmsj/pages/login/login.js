// pages/login/login.js
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
    list: [
      {
        id: 1,
        usrc: "/assets/drawable/ic_account.png",
        pla: "请输入手机号"
      },
      {
        id: 2,
        usrc: "/assets/drawable/ic_password.png",
        pla: "请输入密码"
      }
    ],
    code: 0
  },
  _enroll() {
    wx.navigateTo({
      url: '/pages/enroll/enroll',
    })
  },
  _reset() {
    wx.navigateTo({
      url: '/pages/reset/reset'
    })
  },
  _submit(e) {
    let userId = 'x'
    let sessionId = 'x'
    let cityCode = 1
    let token = utilMd5.hexMD5(userId + sessionId + cityCode + "jiudianlianxian" + app.globalData.format)
    let mobile = e.detail.value.tel
    let password = utilMd5.hexMD5(e.detail.value.pas)
    if (mobile == ""){
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
    } else if (password == ""){
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
    } 
    getSystem("https://www.jnxsdwmsj.com/api/LoginInterface/appLogin", {userId, sessionId, cityCode, token, mobile, password},res => {
      if(res.data.code == 0) {
        let list = res.data.data
        wx.switchTab({
          url: '/pages/mine/mine'
        })
        wx.setStorage({
          key: 'list',
          data: list
        })
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
    let list = wx.getStorageSync("list")
    if (list == "") {
      wx.switchTab({
        url: "/pages/index/index"
      })
    }
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