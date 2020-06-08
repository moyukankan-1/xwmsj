// pages/modify/modify.js
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
    list: [],
    sex: ["男","女"],
    nat: ["汉族","少数民族","其他"],
    occ: ["学生","机关/事业单位","企业职工","城乡居民","退休人员","自由职业者"],
    pol: ["普通居民","共青团员","中共党员"],
    edu: ["专科","本科","研究生","高中","初中","小学"],
    title: "",
    plaTitle: "",
    value: "",
    ty: 0,
    poptitle: "",
    popty: 0,
    IdCard: "",
    gender: "",
    birthdate: "",
    nationality: "",
    occupation: "",
    email: "",
    policitalStatus: "",
    education: "",
    organizationName: "",
    address: "",
    serviceDuration: "",
    introduction: "",
    pop: "",
    skill: ""
  },
  _card() {
    this.setData({
      title: "填写身份证号",
      plaTitle: "请输入身份证号",
      value: "",
      ty: 1
    })
    this.alert.show()
  },
  _bindSex(e) {
    this.setData({
      gender: parseInt(e.detail.value) + 1
    })
  },
  _brithdate(e) {
    this.setData({
      birthdate: e.detail.value
    })
  },
  _bindnat(e) {
    this.setData({
      nationality: parseInt(e.detail.value) + 1
    })
  },
  _bindocc(e) {
    this.setData({
      occupation: this.data.occ[e.detail.value]
    })
  },
  _email() {
    this.setData({
      title: "修改邮箱",
      plaTitle: "请输入邮箱",
      value: this.data.email,
      ty: 2
    })
    this.alert.show()
  },
  _bindpol(e) {
    this.setData({
      policitalStatus: this.data.pol[e.detail.value]
    })
  },
  _bindedu(e) {
    this.setData({
      education: this.data.pol[e.detail.value]
    })
  },
  _unit(e) {
    this.setData({
      title: "修改单位名称",
      plaTitle: "请输入单位名称",
      value: this.data.organizationName,
      ty: 3
    })
    this.alert.show()
  },
  _diqu() {
    wx.navigateTo({
      url: '/pages/applyArea/applyArea'
    })
  },
  _pars(e) {
    this.setData({
      title: "修改详细地址",
      plaTitle: "请输入详细地址",
      value: this.data.address,
      ty: 4
    })
    this.alert.show()
  },
  _time(e) {
    this.setData({
      title: "修改服务时间",
      plaTitle: "请输入服务时间",
      value: this.data.serviceDuration,
      ty: 5
    })
    this.alert.show()
  },
  _mine(e) {
    this.setData({
      title: "修改自我介绍",
      plaTitle: "请输入自我介绍",
      value: this.data.introduction,
      ty: 6
    })
    this.alert.show()
  },
  _lei() {
    this.pop.show()
    this.setData({
      poptitle: "选择服务类型",
      popty: 1
    })
  },
  _neng() {
    this.pop.show()
    this.setData({
      poptitle: "选择个人技能",
      popty: 2
    })
  },

  _handleCancel() {
    this.alert.hide()
  },
  _handleConfirm(e) {
    if(this.data.ty == 1) {
      this.setData({
        IdCard: e.detail
      })
    }else if(this.data.ty == 2) {
      this.setData({
        email: e.detail
      })
    }else if(this.data.ty == 3) {
      this.setData({
        organizationName: e.detail
      })
    }else if(this.data.ty == 4) {
      this.setData({
        adress: e.detail
      })
    }else if(this.data.ty == 5) {
      this.setData({
        serviceDuration: e.detail
      })
    }else if(this.data.ty == 6) {
      this.setData({
        introduction: e.detail
      })
    }
    this.alert.hide()
  },
  _handleCancelpop() {
    this.pop.hide()
  },
  _handleConfirmpop() {
    this.setData({
      pop: app.globalData.pop,
      skill: app.globalData.skill
    })
    this.pop.hide()
  },
  _modhead(e) {
    wx.chooseImage({
      count: 1,
      success: function (res) {
        let tempFilePaths = res.tempFilePaths
        let fileName = tempFilePaths[0].slice(11)
        wx.getFileSystemManager().readFile({
          filePath: tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            wx.uploadFile({
              url: 'https://www.jnxsdwmsj.com/api/PersonalInterface/updateImage',
              filePath: tempFilePaths[0],
              name: 'file',
              formData: {
                'userId': wx.getStorageSync("list").userId,
                'sessionId': wx.getStorageSync("list").sessionid,
                'cityCode': wx.getStorageSync("list").shi_id,
                'token': utilMd5.hexMD5(wx.getStorageSync("list").userId + wx.getStorageSync("list").sessionid + wx.getStorageSync("list").shi_id + "jiudianlianxian" + app.globalData.format),
                'fileName': fileName,
                'headImage': res.data,
              },
              success(res) {
                let data = res.data
              } 
            })
          }
        })
      }
    })
  },
  _updataPas() {
    wx.navigateTo({
      url: '/pages/updataPas/updataPas'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userId = wx.getStorageSync("list").userId
    let sessionId = wx.getStorageSync("list").sessionid
    let cityCode = wx.getStorageSync("list").shi_id
    let token = utilMd5.hexMD5(userId + sessionId + cityCode + "jiudianlianxian" + app.globalData.format)
    getSystem("https://www.jnxsdwmsj.com/api/PersonalInterface/getUserInfo", { userId, sessionId, cityCode, token},res => {
      this.setData({
        list: res.data.data
      })
      this.setData({
        IdCard: this.data.list.IdCard,
        gender: this.data.list.gender,
        birthdate: this.data.list.birthdate,
        nationality: this.data.list.nationality,
        occupation: this.data.list.occupation,
        email: this.data.list.email,
        policitalStatus: this.data.list.policitalStatus,
        education: this.data.list.education,
        organizationName: this.data.list.organizationName,
        address: this.data.list.address,
        serviceDuration: this.data.list.serviceDuration,
        introduction: this.data.list.introduction
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.alert = this.selectComponent("#alert");
    this.pop = this.selectComponent("#pop");
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