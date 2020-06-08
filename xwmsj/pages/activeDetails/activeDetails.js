// pages/activeDetails/activeDetails.js
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
    activityList: {},
    volList: [],
    //区别符
    k: 0,
    d: false
  },
  _morez() {
    if(this.data.d) {
      if(this.data.k == 456) {
        let teamId = this.data.activityList.teamId
        let c = teamId
        let d = this.data.d
        let k = this.data.k
        let z = 2
        wx.navigateTo({
          url: '/pages/volunteer/volunteer',
          success: function (res) {
            res.eventChannel.emit('acceptDataFromOpenerPage', c, k, d,z)
          }
        })
      }
    }
  },
  _more() {
    if(this.data.d) {
      let serviceId = this.data.activityList.serviceId
      let c = serviceId
      let d = this.data.d
      let z = 1
      if(this.data.k == 123) {
        wx.navigateTo({
          url: '/pages/volunteer/volunteer',
          success: function (res) {
            res.eventChannel.emit('acceptDataFromOpenerPage', c,k, d,z)
          }
        })
      }else {
        let teamId = this.data.activityList.teamId
        c = teamId
        d = this.data.d
        let k = this.data.k
        wx.navigateTo({
          url: '/pages/volunteer/volunteer',
          success: function (res) {
            res.eventChannel.emit('acceptDataFromOpenerPage', c,k,d,z)
          }
        })
      }
    }else {
      let activityId = this.data.activityList.activityId
      let c = activityId
      let d = this.data.d
      let z = 1
      wx.navigateTo({
        url: '/pages/volunteer/volunteer',
        success: function (res) {
          res.eventChannel.emit('acceptDataFromOpenerPage', c,d,z)
        }
      })
    }
  },
  _join() {
    let userId = wx.getStorageSync("list").userId
    let sessionId = wx.getStorageSync("list").sessionid
    let cityCode = wx.getStorageSync("list").shi_id
    let token = utilMd5.hexMD5(userId + sessionId + cityCode + "jiudianlianxian" + app.globalData.format)
    getSystem("https://www.jnxsdwmsj.com/api/PersonalInterface/getUserInfo", { userId, sessionId, cityCode, token},res => {
      if (wx.getStorageSync("list") == "") {
        wx.reLaunch({
          url: '/pages/login/login'
        })
      } else if (res.data.data.teamNameList.length == 1) {
        wx.showToast({
          title: '每个人最多只能参加两个团队',
          icon: "none"
        })
      }
      
      let z = res.data.data.userType
      if(z == 2) {
        let teamId = this.data.activityList.teamId
        getSystem("https://www.jnxsdwmsj.com/api/PersonalInterface/addTeam", { userId, sessionId, cityCode, token, teamId},res => {
          if(res.data.code == 0) {
            wx.showToast({
              title: res.data.info
            })
          }
        })
      }else {
        wx.showToast({
          title: '请先成为志愿者!',
          icon: "none"
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (act,k,d) => {
      this.setData({
        activityList: act,
        k: k,
        d: d
      })
    })

    let userId = app.globalData.userId
    let sessionId = app.globalData.sessionId
    let cityCode = app.globalData.cityCode
    let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)
    let activityId = this.data.activityList.activityId
    let serviceId = this.data.activityList.serviceId
    let teamId = this.data.activityList.teamId
    let pageSize = 10
    let currPage = 1

    if(this.data.d) {
      getSystem("https://www.jnxsdwmsj.com/api/OrderSheetInterface/getOrderSheetUser", { userId, sessionId, cityCode, token, serviceId, pageSize, currPage},res => {
        if (res.data.code == 0) {
          this.setData({
            volList: res.data.data.list
          })
        }
      })
      if(this.data.k == 456) {
        getSystem("https://www.jnxsdwmsj.com/api/TeamInterface/getTeamUser", { userId, sessionId, cityCode, token, teamId, pageSize, currPage }, res => {
          if (res.data.code == 0) {
            this.setData({
              volList: res.data.data.list
            })
          }
        })
      }
    }else {
      getSystem("https://www.jnxsdwmsj.com/api/ActivityInterface/getActivityUser", { userId, sessionId, cityCode, token, activityId, pageSize, currPage }, res => {
        if (res.data.code == 0) {
          this.setData({
            volList: res.data.data.list
          })
        }
      })
    }
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