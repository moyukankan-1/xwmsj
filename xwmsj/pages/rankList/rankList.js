// pages/rankList/rankList.js
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
    tops: [
      {
        id: 0,
        name: "志愿者"
      },
      {
        id: 1,
        name: "志愿团队"
      }
    ],
    list: [],
    twoList: [],
    threeList: [],
    teamList: [],
    html: [],
    idx: 0,
    currPage : 1,
    currPage1: 1,
    hiddenImg: false,
    load: "正在加载中"
  },
  _tap(e) {
    this.setData({
      idx: e.currentTarget.id
    })
    //获取志愿团队排行榜
    let userId = app.globalData.userId
    let sessionId = app.globalData.sessionId
    let cityCode = app.globalData.cityCode
    let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)
    let pageSize = 15
    let currPage = 1

    getSystem("https://www.jnxsdwmsj.com/api/RankingInterface/getTeamRanking", { userId, sessionId, cityCode, token, pageSize, currPage }, res => {
      if (res.data.code == 0) {
        this.setData({
          teamList: res.data.data.list
        })
      }
    })
  },
  _lower() {
    if(this.data.idx == 0) {
      let userId = app.globalData.userId
      let sessionId = app.globalData.sessionId
      let cityCode = app.globalData.cityCode
      let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)
      let pageSize = 15
      let currPage = this.data.currPage + 1
      this.setData({
        currPage: currPage
      })
      getSystem("https://www.jnxsdwmsj.com/api/RankingInterface/getVolunteerRanking", { userId, sessionId, cityCode, token, pageSize, currPage }, res => {
        if (res.data.code == 0) {
          this.setData({
            twoList: res.data.data.list,
            list: this.data.list.concat(this.data.twoList)
          })
          //没有数据
          if (res.data.data.list.length == 0) {
            this.setData({
              load: "加载完成了...",
              hiddenImg: true
            })
          } else {
            this.setData({
              load: "正在加载中...",
              hiddenImg: false
            })
          }
        }
      })
    }else if(this.data.idx == 1) {
      let userId = app.globalData.userId
      let sessionId = app.globalData.sessionId
      let cityCode = app.globalData.cityCode
      let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)
      let pageSize = 15
      let currPage = this.data.currPage1 + 1
      this.setData({
        currPage1: currPage
      })

      getSystem("https://www.jnxsdwmsj.com/api/RankingInterface/getTeamRanking", { userId, sessionId, cityCode, token, pageSize, currPage }, res => {
        if (res.data.code == 0) {
          this.setData({
            threeList: res.data.data.list,
            teamList: this.data.teamList.concat(this.data.threeList)
          })
          //没有数据
          if (res.data.data.list.length == 0) {
            this.setData({
              load: "加载完成了...",
              hiddenImg: true
            })
          } else {
            this.setData({
              load: "正在加载中...",
              hiddenImg: false
            })
          }
        }
      })
    }
  },
  _mes(e) {
    let userId = app.globalData.userId
    let sessionId = app.globalData.sessionId
    let cityCode = app.globalData.cityCode
    let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)
    let teamId = this.data.teamList[e.currentTarget.id].teamId
    getSystem("https://www.jnxsdwmsj.com/api/TeamInterface/getTeamInfo", { userId, sessionId, cityCode, token, teamId},res => {
      let act = res.data.data
      console.log(act)
      let k = 456
      let d = true
      wx.navigateTo({
        url: '/pages/activeDetails/activeDetails',
        success: function (res) {
          res.eventChannel.emit('acceptDataFromOpenerPage', act, k, d)
        }
      })
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
    let pageSize = 15
    let currPage = 1
    getSystem("https://www.jnxsdwmsj.com/api/RankingInterface/getVolunteerRanking", { userId, sessionId, cityCode, token, pageSize, currPage},res => {
      if(res.data.code == 0) {
        this.setData({
          list: res.data.data.list
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