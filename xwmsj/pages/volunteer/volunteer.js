// pages/volunteer/volunteer.js
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
    activityId: 0,
    serviceId: 0,
    volList: [],
    d: false,
    k: 0,
    z: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', (c,k,d,z) => {
      this.setData({
        cId: c,
        d: d,
        k: k,
        z: z
      })
    })

    let userId = app.globalData.userId
    let sessionId = app.globalData.sessionId
    let cityCode = app.globalData.cityCode
    let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)
    let pageSize = 10
    let currPage = 1

    if(this.data.d) {
      let serviceId = this.data.cId
      getSystem("https://www.jnxsdwmsj.com/api/OrderSheetInterface/getOrderSheetUser", { userId, sessionId, cityCode, token, serviceId, pageSize, currPage }, res => {
        if (res.data.code == 0) {
          this.setData({
            volList: res.data.data.list
          })
        }
      })
      if(this.data.k == 456) {
        if(this.data.z == 1) {
          let teamId = this.data.cId
          getSystem("https://www.jnxsdwmsj.com//api/TeamInterface/getTeamUser", { userId, sessionId, cityCode, token, teamId, pageSize, currPage }, res => {
            if (res.data.code == 0) {
              this.setData({
                volList: res.data.data.list
              })
            }
          })
        }else if(this.data.z == 2) {
          let teamId = this.data.cId
          getSystem("https://www.jnxsdwmsj.com/api/TeamInterface/getTeamUser", { userId, sessionId, cityCode, token, teamId, pageSize, currPage }, res => {
            if (res.data.code == 0) {
              this.setData({
                volList: res.data.data.list
              })
            }
          })
        }
      }
    }else {
      let activityId = this.data.cId
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