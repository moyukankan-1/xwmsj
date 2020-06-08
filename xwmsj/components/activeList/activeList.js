// components/activeList/activeList.js
import { getSystem } from "../../api/api.js"

//引入app
const app = getApp()

//引入外部md5加密js文件
var utilMd5 = require('../../utils/md5.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
    name: {
      type: Array,
      value: []
    },
    title: String,
    wish: Number,
    iid: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    activityList: {},
    //下拉刷新拿到的数据
    twoList: [],
    currPage: 1,
    load: "",
    title: "全部活动"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    compontpass(e) {
      this.setData({
        list: e.detail
      })
    },
    _itemTap(e) {
      let userId = app.globalData.userId
      let sessionId = app.globalData.sessionId
      let cityCode = app.globalData.cityCode
      let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)

      let activityId = this.properties.list[e.currentTarget.id].activityId
      if(this.properties.wish == 213) {
        getSystem("https://www.jnxsdwmsj.com/api/ActivityInterface/getActivityInfo", { userId, sessionId, cityCode, token, activityId }, res => {
          if (res.data.code == 0) {
            this.setData({
              activityList: res.data.data
            })
            let act = this.data.activityList
            let k = this.properties.wish
            wx.navigateTo({
              url: '/pages/activeDetails/activeDetails',
              success: function (res) {
                res.eventChannel.emit('acceptDataFromOpenerPage', act,k)
              }
            })
          }
        })
      }else if(this.properties.wish == 321) {
        let wishId = this.properties.list[e.currentTarget.id].wishId
        getSystem("https://www.jnxsdwmsj.com/api/WishInterface/getWishInfo", { userId, sessionId, cityCode, token, wishId }, res => {
          if (res.data.code == 0) {
            this.setData({
              activityList: res.data.data
            })
            let act = this.data.activityList
            let k = this.properties.wish
            wx.navigateTo({
              url: '/pages/activeDetails/activeDetails',
              success: function (res) {
                res.eventChannel.emit('acceptDataFromOpenerPage', act,k)
              }
            })
          }
        })
      }else if(this.properties.wish == 123) {
        let serviceId = this.properties.list[e.currentTarget.id].serviceId
        getSystem("https://www.jnxsdwmsj.com/api/OrderSheetInterface/getOrderSheetInfo", { userId, sessionId, cityCode, token, serviceId},res => {
          if (res.data.code == 0) {
            this.setData({
              activityList: res.data.data
            })
            let act = this.data.activityList
            let k = this.properties.wish
            let d = true
            wx.navigateTo({
              url: '/pages/activeDetails/activeDetails',
              success: function (res) {
                res.eventChannel.emit('acceptDataFromOpenerPage', act, k, d)
              }
            })
          }
        })
      }else if(this.properties.wish == 456) {
        let teamId = this.properties.list[e.currentTarget.id].teamId
        getSystem("https://www.jnxsdwmsj.com/api/TeamInterface/getTeamInfo", { userId, sessionId, cityCode, token, teamId},res => {
          if (res.data.code == 0) {
            this.setData({
              activityList: res.data.data
            })
            let act = this.data.activityList
            let k = this.properties.wish
            let d = true
            wx.navigateTo({
              url: '/pages/activeDetails/activeDetails',
              success: function (res) {
                res.eventChannel.emit('acceptDataFromOpenerPage', act, k, d)
              }
            })
          }
        })

      }
    },
    _scroll() {
      let userId = app.globalData.userId
      let sessionId = app.globalData.sessionId
      let cityCode = app.globalData.cityCode
      let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)

      let searchKey = ""
      let activityStateId = app.globalData.activityId
      let areaId = app.globalData.areaId
      let serviceTypeId = app.globalData.serviceTypeId
      let serviceObjectId = app.globalData.serviceObjectId
      let pageSize = 10

      let currPage = this.data.currPage + 1
      this.setData({
        currPage: currPage
      })

      if(this.properties.iid == 123) {
        getSystem("https://www.jnxsdwmsj.com/api/ActivityInterface/getActivityList", { userId, sessionId, cityCode, token, searchKey, activityStateId, areaId, serviceTypeId, serviceObjectId, pageSize, currPage }, res => {
          if (res.data.code == 0) {
            this.setData({
              twoList: res.data.data.list,
              list: this.data.list.concat(this.data.twoList)
            })
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
      }else {
        let claimStateId = -1
        getSystem("https://www.jnxsdwmsj.com/api/WishInterface/getWishList", { userId, sessionId, cityCode, token, searchKey, areaId, claimStateId,pageSize,currPage},res => {
          if(res.data.code == 0) {
            this.setData({
              twoList: res.data.data.list,
              list: this.data.list.concat(this.data.twoList)
            })
          }
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
        })
      }
      if(this.properties.wish == 456) {
        getSystem("https://www.jnxsdwmsj.com/api/TeamInterface/getTeamList", { userId, sessionId, cityCode, token, searchKey, areaId, serviceTypeId, pageSize, currPage }, res => {
          if (res.data.code == 0) {
            this.setData({
              twoList: res.data.data.list,
              list: this.data.list.concat(this.data.twoList)
            })
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
    }
  }
})
