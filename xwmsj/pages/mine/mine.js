// pages/mine/mine.js
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
    //登录成功得到的用户信息
    list: {},
    //中间部分,userType: 1 普通用户
    content: [
      {
        id: 0,
        msrc: "ic_notice.png",
        name: "消息通知"  
      },
      {
        id: 1,
        msrc: "ic_my_wish.png",
        name: "我的心愿"
      },
      {
        id: 2,
        msrc: "ic_my_order.png",
        name: "我的点单"
      },
      {
        id: 3,
        msrc: "ic_become_volunteer.png",
        name: "成为志愿者"
      },
    ],
    //中间部分,userType: 2 志愿者
    content2: [
      {
        id: 0,
        msrc: "ic_notice.png",
        name: "消息通知"
      },
      {
        id: 1,
        msrc: "ic_my_card.png",
        name: "我的名片"
      },
      {
        id: 2,
        msrc: "ic_my_active.png",
        name: "我的活动"
      },
      {
        id: 3,
        msrc: "ic_my_team.png",
        name: "我的团队"
      },
      {
        id: 4,
        msrc: "ic_my_wish.png",
        name: "我的心愿"
      },
      {
        id: 5,
        msrc: "ic_my_order.png",
        name: "我的点单"
      },
      {
        id: 6,
        msrc: "ic_time_score.png",
        name: "时长积分记录"
      },
      {
        id: 7,
        msrc: "ic_become_volunteer.png",
        name: "注册志愿团队"
      }
    ],
    //底部部分
    bottom: [
      {
        id: 0,
        dsrc: "ic_feed_back.png",
        name: "意见反馈"
      },
      {
        id: 1,
        dsrc: "ic_clean_cache.png",
        name: "清除缓存"
      },
      {
        id: 2,
        dsrc: "ic_version_up.png",
        name: "版本更新"
      },
      {
        id: 3,
        dsrc: "ic_exit.png",
        name: "退出登录"
      },
    ],
    //未读消息数量
    num: 0
  },
  _tap(e) {
    if(e.currentTarget.id == 3) {
      let result = app.globalData.result
      if(result != 1) {
        wx.navigateTo({
          url: '/pages/apply/apply'
        })
      }else {
        wx.showToast({
          title: '正在申请中!',
        })
      }
    }else if(e.currentTarget.id == 0) {
      wx.navigateTo({
        url: '/pages/news/news'
      })
    }else if(e.currentTarget.id == 1) {
      wx.navigateTo({
        url: '/pages/mineWish/mineWish'
      })
    }else if(e.currentTarget.id == 2) {
      wx.navigateTo({
        url: '/pages/mineOrder/mineOrder'
      })
    }
  },
  _tap2(e) {
    if(e.currentTarget.id == 0) {
      wx.navigateTo({
        url: '/pages/news/news'
      })
    }else if(e.currentTarget.id == 6) {
      wx.navigateTo({
        url: '/pages/Integral/Integral'
      })
    }else if(e.currentTarget.id == 5) {
      wx.navigateTo({
        url: '/pages/mineOrder/mineOrder'
      })
    }else if(e.currentTarget.id == 3) {
      wx.navigateTo({
        url: '/pages/myTeam/myTeam'
      })
    }else if(e.currentTarget.id == 4) {
      wx.navigateTo({
        url: '/pages/mineWish/mineWish'
      })
    }
  },
  _modify() {
    wx.navigateTo({
      url: '/pages/modify/modify'
    })
  },
  _quit(e) {
    if(e.currentTarget.id == 3) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      wx.showToast({
        title: '退出成功!',
        success: function(res) {
          wx.removeStorageSync("list")
        }
      })
    }else if(e.currentTarget.id == 0) {
      wx.navigateTo({
        url: '/pages/feedback/feedback'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userId = wx.getStorageSync("list").userId
    let sessionId = wx.getStorageSync("list").sessionid
    let cityCode = wx.getStorageSync("list").shi_id
    let token = utilMd5.hexMD5(sessionId + userId + cityCode + "jiudianlianxian" + app.globalData.format)
    //获取未读消息
    getSystem("https://www.jnxsdwmsj.com/api/PersonalInterface/getUnreadList", { userId, sessionId, cityCode, token }, res => {
      console.log(res)
      this.setData({
        num: res.data.data
      })
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
    let list = wx.getStorageSync("list")
    if(list == "") {
      wx.reLaunch({
        url: '/pages/login/login',
      })
    }
    else {
      let userId = wx.getStorageSync("list").userId
      let sessionId = wx.getStorageSync("list").sessionid
      let cityCode = wx.getStorageSync("list").shi_id
    let token = utilMd5.hexMD5(sessionId + userId + cityCode + "jiudianlianxian" + app.globalData.format)
      //获取个人信息
      getSystem("https://www.jnxsdwmsj.com/api/PersonalInterface/getUserInfo", { userId, sessionId, cityCode, token }, res => {
        if (res.data.code == 0) {
          this.setData({
            list: res.data.data
          })
        }
      })
    } 
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