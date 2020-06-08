// components/screen/screen.js
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
    name: {
      type: Array,
      value: []
    },
    title: String,
    wish: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _screen() {
      let wish = this.properties.wish
      wx.navigateTo({
        url: '/pages/screenDetails/screenDetails',
        success: function(res) {
          res.eventChannel.emit('acceptDataFromOpenerPage', wish)
        }
      })
    },
    _close(e) {
      let a = this.properties.name.splice(e.currentTarget.id,1)
      this.setData({
        name: this.properties.name
      })

      let activityStateId = app.globalData.activityStateId
      let isBrand = app.globalData.isBrand
      let areaId = -1
      let serviceTypeId = app.globalData.serviceTypeId
      let serviceObjectId = app.globalData.serviceObjectId
      let claimStateId = -1

      if(this.properties.wish == 321) {
        claimStateId = app.globalData.claimStateId
        areaId = app.globalData.areaId
      }
      
      if(e.currentTarget.id == 0) {
        activityStateId = -1
        isBrand = -1
        if(this.properties.wish == 456) {
          areaId = -1
          if (this.properties.name.length == 0) {
            serviceTypeId = -1
          }
        }else if(this.properties.wish == 321) {
          areaId = -1
          if(this.properties.name.length == 0) {
            claimStateId = -1
          }
        } else if (this.properties.wish == 123 || this.properties.wish == 213) {
          if (areaId != -1) {
            areaId = -1
          } else if (serviceTypeId != -1) {
            serviceTypeId = -1
          }else if(serviceObjectId != -1) {
            serviceObjectId = -1
          }
        }
      } else if (e.currentTarget.id == 1) {
        if(this.properties.wish == 123) {
          areaId = -1
        }
        if(this.properties.wish != 456) {
          claimStateId = -1
        }else if (this.properties.wish == 456) {
          serviceTypeId = -1
        }
        if (this.properties.wish == 123 || this.properties.wish == 213) {
          if (areaId != -1) {
            areaId = -1
          } else if (serviceTypeId != -1) {
            serviceTypeId = -1
          } else if (serviceObjectId != -1) {
            serviceObjectId = -1
          }
        }
      }else if(e.currentTarget.id == 2) {
        serviceTypeId = -1
        if (this.properties.wish == 123 || this.properties.wish == 213) {
          if (serviceTypeId != -1) {
            serviceTypeId = -1
          } else if (serviceObjectId != -1) {
            serviceObjectId = -1
          }
        } 
      }else if(e.currentTarget.id == 3) {
        serviceObjectId = -1
      }

      app.globalData.activityStateId = activityStateId
      app.globalData.isBrand = isBrand
      app.globalData.areaId = areaId
      app.globalData.serviceTypeId = serviceTypeId
      app.globalData.serviceObjectId = serviceObjectId
      app.globalData.claimStateId = claimStateId



      let pageSize = 10
      let currPage = 1
      let searchKey = ""

      let userId = app.globalData.userId
      let sessionId = app.globalData.sessionId
      let cityCode = app.globalData.cityCode
      let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)
      if(this.properties.wish == 213) {
        getSystem("https://www.jnxsdwmsj.com/api/ActivityInterface/getActivityList", { userId, sessionId, cityCode, token, searchKey, activityStateId, areaId, serviceTypeId, serviceObjectId, pageSize, currPage }, res => {
          if (res.data.code == 0) {
            this.triggerEvent('compontpass', res.data.data.list, {})
          }
        })
      } else if(this.properties.wish == 321) {
        getSystem("https://www.jnxsdwmsj.com/api/WishInterface/getWishList", { userId, sessionId, cityCode, token, searchKey,areaId,claimStateId,pageSize,currPage},res=> {
          if (res.data.code == 0) {
            this.triggerEvent('compontpass', res.data.data.list, {})
          }
        })
      }else if(this.properties.wish == 123) {
        getSystem("https://www.jnxsdwmsj.com/api/OrderSheetInterface/getOrderSheetList", { userId, sessionId, cityCode, token, searchKey, searchKey, isBrand, areaId, serviceTypeId, serviceObjectId, pageSize, currPage},res => {
          if (res.data.code == 0) {
            this.triggerEvent('compontpass', res.data.data.list, {})
          }
        })
      }else if(this.properties.wish == 456) {
        getSystem("https://www.jnxsdwmsj.com/api/TeamInterface/getTeamList", { userId, sessionId, cityCode, token, searchKey, searchKey, areaId, serviceTypeId, pageSize, currPage }, res => {
          if (res.data.code == 0) {
            this.triggerEvent('compontpass', res.data.data.list, {})
          }
        })
      }
    }
  }
})
