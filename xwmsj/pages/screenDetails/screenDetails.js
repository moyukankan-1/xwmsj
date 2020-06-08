// pages/screenDetails/screenDetails.js
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
    //活动状态
    activeList: [
      { 
        id: -1,
        name: "全部"
      },
      {
        id: 1,
        name: "未开始"
      },
      {
        id: 2,
        name: "招募中"
      },
      {
        id: 3,
        name: "进行中"
      },
      {
        id: 4,
        name: "已完成"
      },
    ],
    //认领状态
    claim: [
      {
        id: -1,
        name: "全部"
      },
      {
        id: 1,
        name: "未认领"
      },
      {
        id: 2,
        name: "已认领"
      }
    ],
    //品牌
    trademarkList: [
      {
        id: -1,
        name: "全部"
      },
      {
        id: 1,
        name: "品牌"
      }
    ],
    //地区
    areaList: [],
    //服务类型
    serviceTypeList: [],
    //服务对象
    serviceObjectList:[],
    //活动状态选择样式
    activeIdx: 0,
    //地区选择状态
    adressIdx: 101,
    //服务类型选择状态
    typeIdx: 101,
    //服务对象选择状态
    objectIdx: 101,
    //认领状态选择状态
    claimIdx: 0,
    //品牌选择状态
    trademarkIdx: 0,
    //判断筛选条件
    wish: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', wish => {
      this.setData({
        wish: wish
      })
    })

    let userId = app.globalData.userId
    let sessionId = app.globalData.sessionId
    let cityCode = app.globalData.cityCode
    let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)
    getSystem("https://www.jnxsdwmsj.com/api/SystemInterface/getSysconfigList", { userId, sessionId, cityCode, token }, res => {
      if (res.data.code == 0) {
        this.setData({
          areaList: res.data.data.areaList,
          serviceTypeList: res.data.data.serviceTypeList,
          serviceObjectList: res.data.data.serviceObjectList
        })
      }
    })
  },
  _trademarkCut(e) {
    this.setData({
      trademarkIdx: e.currentTarget.id
    })
  },
  _claimCut(e) {
    this.setData({
      claimIdx: e.currentTarget.id
    })
  },
  _activeCut(e) {
    this.setData({
      activeIdx: e.currentTarget.id
    })
  },
  _adressCut(e) {
    this.setData({
      adressIdx: e.currentTarget.id
    })
  },
  _typeCut(e) {
    this.setData({
      typeIdx: e.currentTarget.id
    })
  },
  _objectCut(e) {
    this.setData({
      objectIdx: e.currentTarget.id
    })
  },
  _confirm() {
    let activityStateId = -1
    let isBrand = -1
    let claimStateId = -1
    let areaId = -1
    let serviceTypeId = -1
    let serviceObjectId = -1
    let activeName = ""
    let areaName = ""
    let typeName = ""
    let objectName = ""
    let claimName = ""
    let trademarkName = ""

    if(this.data.activeIdx == 0) {
      activityStateId = -1
    }else {
      activityStateId = this.data.activeList[this.data.activeIdx].id
      activeName = this.data.activeList[this.data.activeIdx].name
    }
    if(this.data.claimIdx == 0) {
      claimStateId = -1
    }else {
      claimStateId = this.data.claim[this.data.claimIdx].id
      claimName = this.data.claim[this.data.claimIdx].name
    }
    if (this.data.trademarkIdx == 0) {
      isBrand = -1
    }else {
      isBrand = this.data.trademarkList[this.data.trademarkIdx].id
      trademarkName = this.data.trademarkList[this.data.trademarkIdx].name
    }

    if (this.data.adressIdx == 101) {
      areaId = -1
    } else {
      areaId = this.data.areaList[this.data.adressIdx].areaId
      areaName = this.data.areaList[this.data.adressIdx].areaName
    }

    if (this.data.typeIdx == 101) {
      serviceTypeId = -1
    } else {
      serviceTypeId = this.data.serviceTypeList[this.data.typeIdx].typeId
      typeName = this.data.serviceTypeList[this.data.typeIdx].typeName
    }

    if (this.data.objectIdx == 101) {
      serviceObjectId = -1
    } else {
      serviceObjectId = this.data.serviceObjectList[this.data.objectIdx].objectId
      objectName = this.data.serviceObjectList[this.data.objectIdx].objectName
    }

    let opa = [
      { name: activeName},
      { name: areaName },
      { name: typeName },
      { name: objectName }
    ]
    let opb = [
      { name: areaName },
      {name: claimName}
    ]
    let opc = [
      { name: trademarkName},
      { name: areaName },
      { name: typeName },
      { name: objectName }
    ]
    let opd = [
      {name: areaName},
      {name: typeName}
    ]
    if(this.data.wish == 321) {
      wx.setStorage({
        key: "a",
        data: areaId,
        success: function () {
          wx.navigateBack();   //返回上一个页面
        }
      })
      wx.setStorage({
        key: "b",
        data: claimStateId,
      })
      wx.setStorage({
        key: "c",
        data: opb,
      })
      wx.setStorage({
        key: "d",
        data: 321,
      })
    }else if(this.data.wish == 213) {
      wx.switchTab({
        url: '/pages/active/active',
        success: function (res) {
          var page = getCurrentPages().pop();
          if (page == undefined || page == null) return
          page.onLoad({ a: activityStateId, b: areaId, c: serviceTypeId, d: serviceObjectId, e: opa });
        }
      })
    }else if(this.data.wish == 123) {
      wx.setStorage({
        key: "a",
        data: isBrand,
        success: function () {
          wx.navigateBack();   //返回上一个页面
        }
      })
      wx.setStorage({
        key: "b",
        data: areaId,
      })
      wx.setStorage({
        key: "c",
        data: serviceTypeId,
      })
      wx.setStorage({
        key: "d",
        data: serviceObjectId,
      })
      wx.setStorage({
        key: "e",
        data: opc,
      })
      wx.setStorage({
        key: "f",
        data: 123,
      })
    }else if(this.data.wish == 456) {
      wx.setStorage({
        key: "a",
        data: areaId,
        success: function () {
          wx.navigateBack();   //返回上一个页面
        }
      })
      wx.setStorage({
        key: "b",
        data: serviceTypeId,
      })
      wx.setStorage({
        key: "c",
        data: opd,
      })
      wx.setStorage({
        key: "d",
        data: 456,
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
    //没有点击确定按钮离开页面，则清除上一次状态
    wx.removeStorage({
      key: 'a',
    })
    wx.removeStorage({
      key: 'b',
    })
    wx.removeStorage({
      key: 'c',
    })
    wx.removeStorage({
      key: 'd',
    })
    wx.removeStorage({
      key: 'e',
    })
    wx.removeStorage({
      key: 'f',
    })
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