// pages/enroll/enroll.js
import { getSystem} from "../../api/api.js"
//引入app
const app = getApp()

//引入外部md5加密js文件
var utilMd5 = require('../../utils/md5.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //手机号
    mobile: "",
    //姓名
    name: "",
    //身份证号
    IDCard: "",
    //验证码
    validateCode: "",
    //密码
    password: "",
    //验证码文本
    codeTest: "获取验证码",
    //验证码点击之后的样式
    isActive: false,
    list: [
      {
        id: 1,
        name: "姓名:",
        plac: "请输入姓名",
        uname: "xm",
        yzm: true
      },
      {
        id: 2,
        name: "身份证号:",
        plac: "请输入身份证号",
        uname: "sf",
        yzm: true
      },
      {
        id: 3,
        name: "手机号:",
        plac: "请输入手机号",
        uname: "sj",
        yzm: true
      },
      {
        id: 4,
        name: "验证码:",
        plac: "请输入验证码",
        uname: "yz",
        yzm: false
      }
    ]
  },
  //获取手机号输入框的值
  getValue(e) {
    if (e.currentTarget.id == 3) {
      this.setData({
        mobile: e.detail.value,
      })
    } else if (e.currentTarget.id == 1) {
      this.setData({
        name: e.detail.value,
      })
    } else if (e.currentTarget.id == 2) {
      this.setData({
        IDCard: e.detail.value,
      })
    } else if (e.currentTarget.id == 4) {
      this.setData({
        validateCode: e.detail.value,
      })
    } else if (e.currentTarget.id == 5) {
      this.setData({
        password: e.detail.value,
      })
    }
     
  },
  // 获取验证码
  _code() {
    let mobile = this.data.mobile
    let userId = app.globalData.userId
    let sessionId = app.globalData.sessionId
    let cityCode = app.globalData.cityCode
    let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)

    getSystem("https://www.jnxsdwmsj.com/api/RegisterInterface/sendCode", { userId, sessionId, cityCode, token, mobile },res => {
      if(res.data.code == 0) {
        //修改验证码文本内容
        let i = 60
        setInterval(() => {
          i--
          this.setData({
            codeTest: `重新获取(${i})`,
            isActive: true
          })
          if (i == 0) {
            this.setData({
              codeTest: "获取验证码",
              isActive: false
            })
          }
        }, 1000)
        wx.showToast({
          title: res.data.info,
          icon: "none"
        })
      }else if(res.data.code == 1) {
        wx.showToast({
          title: res.data.info,
          icon: "none"
        })
      }
    })  
  },
  _enroll(e) {
    let userId = app.globalData.userId
    let sessionId = app.globalData.sessionId
    let cityCode = app.globalData.cityCode
    let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)
    let name = this.data.name
    let IDCard = this.data.IDCard
    let mobile = this.data.mobile
    let validateCode = this.data.validateCode
    let password = this.data.password
    getSystem("https://www.jnxsdwmsj.com/api/RegisterInterface/appRegister", { userId, sessionId, cityCode, token,mobile,password,validateCode,name,IDCard},res => {
      if(res.data.code == 0) {
        wx.showToast({
          title: res.data.info,
          icon: "none"
        })
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }else if(res.data.code == 1) {
        wx.showToast({
          title: res.data.info,
          icon: "none"
        })
      }
    })
  },

  //提交按钮：判断input的值是否为空
  _submittap(e) {
    if(e.detail.value.xm == "") {
      wx.showToast({
        title: '请输入姓名',
        icon: "none"
      })
      return
    }else if(e.detail.value.sf == "") {
      wx.showToast({
        title: '请输入身份证号',
        icon: "none"
      })
      return
    } else if (e.detail.value.sj == "") {
      wx.showToast({
        title: '请输入手机号',
        icon: "none"
      })
      return
    } else if (e.detail.value.yz == "") {
      wx.showToast({
        title: '请输入验证码',
        icon: "none"
      })
      return
    } else if (e.detail.value.mm == "") {
      wx.showToast({
        title: '请输入密码',
        icon: "none"
      })
      return
    } else if (e.detail.value.qr == "") {
      wx.showToast({
        title: '请输入确认密码',
        icon: "none"
      })
      return
    } else if (e.detail.value.mm != e.detail.value.qr) {
      wx.showToast({
        title: '密码输入不一致',
        icon: "none"
      })
    }
    
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