// pages/apply/apply.js
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
    date: "",
    nation: ["汉族","少数民族","其他"],
    nationitem: "",
    occupation: ["学生","机关/事业单位","企业职工","城乡居民","退休人员","自由职业者"],
    occupationitem: "",
    politics: ["普通居民","共青团员","中共党员"],
    politicsitem: "",
    culture: ["专科","本科","研究生","高中","初中","小学"],
    cultureitem: "",
    leftName: "",
    rightName: "",
    title: "请选择服务类型",
    type: 1,
    name: "",
    gender: "",
    email:"",
    units: "",
    madress: "",
    pop: "",
    skill: "",
    time: "",
    intro: "",
    shiId: 0
  },
  _bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  _bindNationChange(e) {
    this.setData({
      nationitem: e.detail.value
    })
  },
  _bindOccupationChange(e) {
    this.setData({
      occupationitem: e.detail.value
    })
  },
  _bindPoliticsChange(e) {
    this.setData({
      politicsitem: e.detail.value
    })
  },
  _bindCultureChange(e) {
    this.setData({
      cultureitem: e.detail.value
    })
  },
  _bindApplyareaChange(e) {
    wx.navigateTo({
      url: '/pages/applyArea/applyArea'
    })
  },
  _email(e) {
    this.setData({
      email: e.detail.value
    })
  },
  _madress(e) {
    this.setData({
      madress: e.detail.value
    })
  },
  _time(e) {
    this.setData({
      time: e.detail.value
    })
  },
  _intro(e) {
    this.setData({
      intro: e.detail.value
    })
  },
  _units(e) {
    this.setData({
      units: e.detail.value
    })
  },
  _modal() {
    this.pop.show()
    this.setData({
      title: "请选择服务类型",
      type: 1
    })
  },
  _skill() {
    this.pop.show()
    this.setData({
      title: "请选择个人技能",
      type: 2
    })
  },
  _handleCancel() {
    this.pop.hide()
  },
  _handleConfirm() {
    this.setData({
      pop: app.globalData.pop,
      skill: app.globalData.skill
    })
    this.pop.hide()
  },
  _gender(e) {
    this.setData({
      gender: e.detail.value
    })
  },
  _submit() {
    let userId = wx.getStorageSync("list").userId
    let sessionId = wx.getStorageSync("list").sessionid
    let cityCode = wx.getStorageSync("list").shi_id
    let token = utilMd5.hexMD5(userId + sessionId + cityCode + "jiudianlianxian" + app.globalData.format)
    let gender = this.data.gender
    let birthdate = this.data.date
    let nationality = this.data.nationitem
    let occupation = this.data.occupationitem
    let email = this.data.email
    let policitalStatus = this.data.politicsitem
    let education = this.data.cultureitem
    let organizationName = this.data.units
    let shiId = this.data.shiId
    let xianquId = app.globalData.leftId
    let zhenjieId = app.globalData.rightId
    let address = this.data.madress
    let serviceType = app.globalData.pop
    let skill = app.globalData.skill
    let introduction = this.data.intro
    let serviceDuration = this.data.time
    getSystem("https://www.jnxsdwmsj.com/api/RegisterInterface/registerVolunteer", { userId, sessionId, cityCode, token, gender, birthdate, nationality, occupation, email, policitalStatus, education, organizationName, shiId, xianquId, zhenjieId, address, serviceType, skill, introduction, serviceDuration},res => {
      console.log(res)
      if(res.data.code == 0) {
        wx.showToast({
          title: res.data.info
        })
        setTimeout(() => {
          wx.navigateBack()
          app.globalData.result = 1
        },1000)
      }else {
        app.globalData.result = 1
        wx.showToast({
          title: res.data.info,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: wx.getStorageSync("list").name,
      shiId: wx.getStorageSync("list").shi_id
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.pop = this.selectComponent("#pop");
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