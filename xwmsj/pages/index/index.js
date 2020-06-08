//index.js
import { getSystem } from "../../api/api.js"

//引入app
const app = getApp()

//引入外部md5加密js文件
var utilMd5 = require('../../utils/md5.js')

Page({
  data: {
    aa: 0,
    //滚动到文章列表位置设置为true
    scrollY: false,
    //轮播图片
    list: [],
    //tab栏item第二页
    tabItem: [
      {
        src: "/assets/drawable/ic_navi_study.png",
        text: "学习强国"
      },
      {
        src: "/assets/drawable/ic_navi_light.png",
        text: "灯塔在线"
      },
      {
        src: "/assets/drawable/ic_navi_yd.png",
        text: "齐鲁壹点"
      },
      {
        src: "/assets/drawable/ic_navi_wmjn.png",
        text: "文明济宁"
      },
      {
        src: "/assets/drawable/ic_navi_county.png",
        text: "县区频道"
      },
      {
        src: "/assets/drawable/ic_navi_jnxw.png",
        text: "济宁新闻"
      },
      {
        src: "/assets/drawable/ic_navi_zsjn.png",
        text: "掌上济宁"
      },
      {
        src: "/assets/drawable/ic_navi_yzdx.png",
        text: "兖州通信云"
      }
    ],
    //tab栏item第一页
    tabTwo: [
      {
        src: "/assets/drawable/ic_navi_sign.png",
        text: "活动打卡"
      },
      {
        src: "/assets/drawable/ic_navi_active.png",
        text: "活动公示"
      },
      {
        src: "/assets/drawable/ic_navi_team.png",
        text: "志愿团队"
      },
      {
        src: "/assets/drawable/ic_navi_ranking.png",
        text: "排行榜"
      },
      {
        src: "/assets/drawable/ic_navi_wish.png",
        text: "心愿墙"
      },
      {
        src: "/assets/drawable/ic_navi_my_wish.png",
        text: "我的心愿"
      },
      {
        src: "/assets/drawable/ic_navi_front.png",
        text: "实践阵地"
      },
      {
        src: "/assets/drawable/ic_navi_order_service.png",
        text: "点单服务"
      }
    ],
    //文章栏目列表
    articles: [],
    //获取文章列表
    articleItems: [],
    //首页的type类型
    type: 1
  },
  onLoad: function () {
    var query = wx.createSelectorQuery()
    query.select('#cc').boundingClientRect(res => {
      this.setData({
        aa: res.top
      })
    }).exec()
    let userId = app.globalData.userId
    let sessionId = app.globalData.sessionId
    let cityCode = app.globalData.cityCode
    let token = utilMd5.hexMD5(sessionId + userId + cityCode + "jiudianlianxian" + app.globalData.format)
    //调用轮播-----
    getSystem("https://www.jnxsdwmsj.com/api/SystemInterface/getSlideList", {userId, sessionId, cityCode, token}, res => {
      if(res.data.code == 0) {
        this.setData({
          list: res.data.data
        })
      }
    })
    //文章栏目列表------
    //首页类型
    let type = this.data.type
    getSystem("https://www.jnxsdwmsj.com/api/NewsInterface/getNewsClass", { userId, sessionId, cityCode, token, type},res => {
      if(res.data.code == 0) {
        this.setData({
          articles: res.data.data
        })
      }else if(res.data.code == 1) {
        wx.showToast({
          title: res.data.code,
          icon: "none"
        })
      }
    })
    //文章列表-----
    //初始加载栏目Id
    let columnId = 3
    //初始显示的数量
    let pageSize = 10
    //当前页码
    let currPage = 1 
    getSystem("https://www.jnxsdwmsj.com/api/NewsInterface/getNewsList", { userId, sessionId, cityCode, token, type, columnId, pageSize, currPage},res => {
      if(res.data.code == 0) {
        this.setData({
          articleItems: res.data.data.list
        })
      }
    })
  },

  //判断滚动到哪了，如果滚动到距离顶部420px的时候，把文章栏目设置为固定布局
  onPageScroll(e) {
    if(e.scrollTop >= this.data.aa) {
      this.setData({
        scrollY: true
      })
    }else {
      this.setData({
        scrollY: false
      })
    }
  },
  //判断第一页tab选项卡的点击
  _tabTap1(e) {
    if(e.currentTarget.id == 2) {
      //跳转到志愿团队页面
      wx.navigateTo({
        url: '/pages/komsta/komsta'
      })
    }else if(e.currentTarget.id == 3) {
      //跳转到排行榜页面
      wx.navigateTo({
        url: '/pages/rankList/rankList'
      })
    }else if(e.currentTarget.id == 4) {
      //跳转到心愿墙页面
      wx.navigateTo({
        url: '/pages/wish/wish'
      })
    }else if(e.currentTarget.id == 6) {
      if (wx.getStorageSync("list") == "") {
        wx.reLaunch({
          url: '/pages/login/login',
        })
      } else {
        //跳转到实践阵地
        wx.navigateTo({
          url: '/pages/practice/practice'
        })
      }
    }else if(e.currentTarget.id == 7) {
      //跳转到点单服务页面
      wx.navigateTo({
        url: '/pages/order/order'
      })
    }else if(e.currentTarget.id == 5) {
      if(wx.getStorageSync("list") == "") {
        wx.reLaunch({
          url: '/pages/login/login',
        })
      }else {
        wx.navigateTo({
          url: '/pages/mineWish/mineWish'
        })
      }
    }else if(e.currentTarget.id ==0) {
      if(wx.getStorageSync("list").length == 0) {
        wx.showToast({
          title: '请先登录',
        })
      }else {
        wx.scanCode({
          onlyFromCamera: true,
          success(res) {
            let userId = wx.getStorageSync("list").userId
            let sessionId = wx.getStorageSync("list").sessionid
            let cityCode = wx.getStorageSync("list").shi_id
            let token = utilMd5.hexMD5(userId + sessionId + cityCode + "jiudianlianxian" + "20200605")
            let value = res
            getSystem("https://www.jnxsdwmsj.com//api/PersonalActivityInterface/setActivitySign", { userId, sessionId, cityCode, token, value }, res => {
              if (res.data.code == 0) {
                wx.showToast({
                  title: res.data.info,
                })
              }
            })
          }
        })
      }
    }else if(e.currentTarget.id == 1) {
      wx.switchTab({
        url: '/pages/active/active'
      })
    }
  },
  //判断第二页tab选项卡的点击
  _tabTap2(e) {
    if(e.currentTarget.id == 0) {
      wx.showToast({
        title: '未安装《学习强国》,请去安装下载',
        icon: "none"
      })
    }else if(e.currentTarget.id == 1) {
      wx.showToast({
        title: '未安装《灯塔党建在线》,请去安装下载',
        icon: "none"
      })
    } else if (e.currentTarget.id == 2) {
      let url = "http://www.ql1d.com/"
      wx.navigateTo({
        url: '/pages/out/out',
        success: function (res) {
          res.eventChannel.emit('acceptDataFromOpenerPage', url)
        }
      })
    }else if(e.currentTarget.id == 3) {
      let url = "http://sdjn.wenming.cn/"
      wx.navigateTo({
        url: '/pages/out/out',
        success: function (res) {
          res.eventChannel.emit('acceptDataFromOpenerPage', url)
        }
      })
    }else if(e.currentTarget.id == 4) {
      //跳转到县区频道页面
      wx.navigateTo({
        url: '/pages/counties/counties'
      })
    } else if(e.currentTarget.id == 5) {
      let url = "http://www.jnnews.tv/"
      wx.navigateTo({
        url: '/pages/out/out',
        success: function (res) {
          res.eventChannel.emit('acceptDataFromOpenerPage', url)
        }
      })
    }else if(e.currentTarget.id == 6) {
      let url = "http://www.jn001.com/"
      wx.navigateTo({
        url: '/pages/out/out',
        success: function (res) {
          res.eventChannel.emit('acceptDataFromOpenerPage', url)
        }
      })
    }else if(e.currentTarget.id == 7) {
      wx.showToast({
        title: '未安装《兖州通信云》，请去安装下载',
        icon: "none"
      })
    }
  },
})
