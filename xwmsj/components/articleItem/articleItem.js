// components/articleItem/articleItem.js
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
    //文章栏目
    items: {
      type: Array,
      value: []
    },
    //文章列表
    lists: {
      type: Array,
      value: []
    },
    //当前的type类型
    typeitem: Number,
    kc: {
      type: Array,
      value: []
    },
    //滚动到420px 为true
    scrollY: Boolean,
    //文章栏目列表大于4显示横向滚动
    scrollX: Boolean,
    iid: Number
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    current: 0,
    //上拉加载拿到的数据
    listsTwo: [],
    //当前页码
    currPage: 1,
    //加载中和加载完毕
    load: "",
    //加载完成隐藏loading图片，默认不隐藏
    hiddenImg: false,
    //文章详情列表
    listDetails: [],
    toView: 0,
    currentIdx: 101,
    scrollTop: 0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //滑动到底部,加载更多
    _scroll() {
      let userId = app.globalData.userId
      let sessionId = app.globalData.sessionId
      let cityCode = app.globalData.cityCode
      let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)
      let type = this.properties.typeitem
      let pageSize = 10
      let currPage = this.data.currPage + 1
      this.setData({
        currPage: currPage
      })
      let columnId = 0
      if(type == 1 || type ==2) {
        if (this.data.current == 0) {
          columnId = 3
        } else if (this.data.current == 1) {
          columnId = 9
        } else if (this.data.current == 2) {
          columnId = 66
        } else if (this.data.current == 3) {
          columnId = 12
        }
      }else {
        if (this.data.current == 0) {
          columnId = 31
        } else if (this.data.current == 1) {
          columnId = 32
        } else if (this.data.current == 2) {
          columnId = 33
        } else if (this.data.current == 3) {
          columnId = 34
        }
      }

      //首页类型
      if(type == 1) {
        getSystem("https://www.jnxsdwmsj.com/api/NewsInterface/getNewsList", { userId, sessionId, cityCode, token, type, columnId, pageSize, currPage},res => {
          if(res.data.code == 0) {
            this.setData({
              listsTwo: res.data.data.list,
              lists: this.data.lists.concat(this.data.listsTwo)
            })
            //没有数据
            if(res.data.data.list.length == 0) {
              this.setData({
                load: "加载完成了...",
                hiddenImg: true
              })
            }else {
              this.setData({
                load: "正在加载中...",
                hiddenImg: false
              })
            }
          }
        })
      }else if(this.properties.iid == 123) {
        let areaId = app.globalData.areaId

        // 当前点击那个栏目显示哪页数据
        let columnId = 0
        if (this.data.current == 0) {
          columnId = this.properties.items[this.data.current].columnId
        } else if (this.data.current == 1) {
          columnId = this.properties.items[this.data.current].columnId
        } else if (this.data.current == 2) {
          columnId = this.properties.items[this.data.current].columnId
        } else if (this.data.current == 3) {
          columnId = this.properties.items[this.data.current].columnId
        } else if (this.data.current == 4) {
          columnId = this.properties.items[this.data.current].columnId
        } else if (this.data.current == 5) {
          columnId = this.properties.items[this.data.current].columnId
        } else if (this.data.current == 6) {
          columnId = this.properties.items[this.data.current].columnId
        }
        getSystem("https://www.jnxsdwmsj.com/api/CountyInterface/getNewsList", { userId, sessionId, cityCode, token, areaId, columnId, pageSize, currPage }, res => {
          if (res.data.code == 0) {
            this.setData({
              listsTwo: res.data.data.list,
              lists: this.properties.lists.concat(this.data.listsTwo)
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
      }else if(type == 2) {
        getSystem("https://www.jnxsdwmsj.com/api/NewsInterface/getNewsList", { userId, sessionId, cityCode, token, type, columnId, pageSize, currPage }, res => {
          if (res.data.code == 0) {
            this.setData({
              listsTwo: res.data.data.list,
              lists: this.data.lists.concat(this.data.listsTwo)
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
      }else if(type == 3) {
        getSystem("https://www.jnxsdwmsj.com/api/NewsInterface/getNewsList", { userId, sessionId, cityCode, token, type, columnId, pageSize, currPage }, res => {
          if (res.data.code == 0) {
            this.setData({
              listsTwo: res.data.data.list,
              lists: this.data.lists.concat(this.data.listsTwo)
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
    //栏目点击
    _handlerSelect(e) {
      let userId = app.globalData.userId
      let sessionId = app.globalData.sessionId
      let cityCode = app.globalData.cityCode
      let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)
      let idx = parseInt(e.detail.currentIdx)
      this.setData({
        current: idx
      })
      //type类型
      let type = this.properties.typeitem
      //当前点击那个栏目显示哪页数据
      let columnId = 0
      if(type != 3) {
        if (idx == 0) {
          columnId = 3
        } else if (idx == 1) {
          columnId = 9
        } else if (idx == 2) {
          columnId = 66
        } else if (idx == 3) {
          columnId = 12
        }
      }else {
        if (idx == 0) {
          columnId = 31
        } else if (idx == 1) {
          columnId = 32
        } else if (idx == 2) {
          columnId = 33
        } else if (idx == 3) {
          columnId = 34
        }
      }
      //当前显示的数量
      let pageSize = 10
      //当前页码
      let currPage = 1
      //文章列表
      //判断type类型
      if(type == 1) {
        getSystem("https://www.jnxsdwmsj.com/api/NewsInterface/getNewsList", { userId, sessionId, cityCode, token, type, columnId, pageSize, currPage }, res => {
          if (res.data.code == 0) {
            this.setData({
              lists: res.data.data.list,
              scrollTop: 0
            })
          }
        })
      }else if(this.properties.iid == 123) {
        let userId = app.globalData.userId
        let sessionId = app.globalData.sessionId
        let cityCode = app.globalData.cityCode
        let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)

        // 当前点击那个栏目显示哪页数据
        let columnId = 0
        if (e.detail.currentIdx == 0) {
          columnId = 44
          this.setData({
            kc: this.properties.items[e.detail.currentIdx].subColumnList
          })
        } else if (e.detail.currentIdx == 1) {
          columnId = 43
          this.setData({
            kc: this.properties.items[e.detail.currentIdx].subColumnList
          })
        } else if (e.detail.currentIdx == 2) {
          columnId = 42
          this.setData({
            kc: this.properties.items[e.detail.currentIdx].subColumnList
          })
        } else if (e.detail.currentIdx == 3) {
          columnId = 41
          this.setData({
            kc: this.properties.items[e.detail.currentIdx].subColumnList
          })
        } else if (e.detail.currentIdx == 4) {
          columnId = 40
          this.setData({
            kc: this.properties.items[e.detail.currentIdx].subColumnList
          })
        } else if (e.detail.currentIdx == 5) {
          columnId = 70
          this.setData({
            kc: this.properties.items[e.detail.currentIdx].subColumnList
          })
        } else if (e.detail.currentIdx == 6) {
          columnId = 86
          this.setData({
            kc: this.properties.items[e.detail.currentIdx].subColumnList
          })
        }
        
        let areaId = app.globalData.areaId
        getSystem("https://www.jnxsdwmsj.com/api/CountyInterface/getNewsList", { userId, sessionId, cityCode, token, areaId, columnId, pageSize, currPage }, res => {
          if (res.data.code == 0) {
            this.setData({
              lists: res.data.data.list,
              scrollTop: 0
            })
          }
        })
      }else if(type == 2) {
        getSystem("https://www.jnxsdwmsj.com/api/NewsInterface/getNewsList", { userId, sessionId, cityCode, token, type, columnId, pageSize, currPage }, res => {
          if (res.data.code == 0) {
            this.setData({
              lists: res.data.data.list,
              scrollTop: 0
            })
          }
        })
      }else if(type == 3) {
        getSystem("https://www.jnxsdwmsj.com/api/NewsInterface/getNewsList", { userId, sessionId, cityCode, token, type, columnId, pageSize, currPage }, res => {
          if (res.data.code == 0) {
            this.setData({
              lists: res.data.data.list,
              scrollTop: 0
            })
          }
        })
      }
    },
    //栏目滑动
    _handlerChange(e) {
      //获取分选择器组件本身
      let seg = this.selectComponent("#sp_sb")
      //调用对应的方法
      seg._setCurrentIdx(e.detail.current)
      
      let userId = app.globalData.userId
      let sessionId = app.globalData.sessionId
      let cityCode = app.globalData.cityCode
      let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)

      app.globalData.all = e.detail.current

      let type = this.properties.typeitem
      let columnId = 0
      if(type ==1 || type ==2) {
        //当前点击那个栏目显示哪页数据
        if (e.detail.current == 0) {
          columnId = 3
        } else if (e.detail.current == 1) {
          columnId = 9
        } else if (e.detail.current == 2) {
          columnId = 66
        } else if (e.detail.current == 3) {
          columnId = 12
        }
      }else {
        //当前点击那个栏目显示哪页数据
        if (e.detail.current == 0) {
          columnId = 31
        } else if (e.detail.current == 1) {
          columnId = 32
        } else if (e.detail.current == 2) {
          columnId = 33
        } else if (e.detail.current == 3) {
          columnId = 34
        }
      }

      //当前显示的数量
      let pageSize = 10
      //当前页码
      let currPage = 1
      //文章列表
      //判断type类型
      if (type == 1) {
        getSystem("https://www.jnxsdwmsj.com/api/NewsInterface/getNewsList", { userId, sessionId, cityCode, token, type, columnId, pageSize, currPage }, res => {
          if (res.data.code == 0) {
            this.setData({
              lists: res.data.data.list
            })
          }
        })
      }else if(type == 2) {
        getSystem("https://www.jnxsdwmsj.com/api/NewsInterface/getNewsList", { userId, sessionId, cityCode, token, type, columnId, pageSize, currPage }, res => {
          if (res.data.code == 0) {
            this.setData({
              lists: res.data.data.list
            })
          }
        })
      }else if(type == 3) {
        getSystem("https://www.jnxsdwmsj.com/api/NewsInterface/getNewsList", { userId, sessionId, cityCode, token, type, columnId, pageSize, currPage }, res => {
          if (res.data.code == 0) {
            this.setData({
              lists: res.data.data.list
            })
          }
        })
      }else if(this.properties.iid == 123) {
        // 当前滑动到栏目显示哪页数据
        let columnId = 0
        if (e.detail.current == 0) {
          columnId = 44
          this.setData({
            kc: this.properties.items[e.detail.current].subColumnList,
            currentIdx: 101
          })
        } else if (e.detail.current == 1) {
          columnId = 43
          this.setData({
            kc: this.properties.items[e.detail.current].subColumnList,
            currentIdx: 101
          })
        } else if (e.detail.current == 2) {
          columnId = 42
          this.setData({
            kc: this.properties.items[e.detail.current].subColumnList,
            currentIdx: 101
          })
        } else if (e.detail.current == 3) {
          columnId = 41
          this.setData({
            kc: this.properties.items[e.detail.current].subColumnList,
            currentIdx: 101
          })
        } else if (e.detail.current == 4) {
          columnId = 40
          this.setData({
            kc: this.properties.items[e.detail.current].subColumnList,
            currentIdx: 101
          })
        } else if (e.detail.current == 5) {
          columnId = 70
          this.setData({
            kc: this.properties.items[e.detail.current].subColumnList,
            currentIdx: 101
          })
        } else if (e.detail.current == 6) {
          columnId = 86
          this.setData({
            kc: this.properties.items[e.detail.current].subColumnList,
            currentIdx: 101
          })
        }
        columnId = this.properties.items[e.detail.current].columnId
        let areaId = app.globalData.areaId
        getSystem("https://www.jnxsdwmsj.com/api/CountyInterface/getNewsList", { userId, sessionId, cityCode, token, areaId, columnId, pageSize, currPage }, res => {
          if (res.data.code == 0) {
            this.setData({
              lists: res.data.data.list
            })
          }
        })
      }

    },
    //点击详情
    _details(e) {
      let userId = app.globalData.userId
      let sessionId = app.globalData.sessionId
      let cityCode = app.globalData.cityCode
      let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)
      let type = this.properties.typeitem

      let articleId = this.data.lists[e.currentTarget.id].articleId
      if(type == 1) {
        getSystem("https://www.jnxsdwmsj.com/api/NewsInterface/getNewsInfo", { userId, sessionId, cityCode, token, articleId, type }, res => {
          if (res.data.code == 0) {
            this.setData({
              listDetails: res.data.data
            })
            let datas = this.data.listDetails
            wx.navigateTo({
              url: '/pages/articleDetails/articleDetails',
              success: function (res) {
                res.eventChannel.emit('acceptDataFromOpenerPage', { data: datas })
              }
            })
          } else if (res.data.code == 1) {
            wx: showToast({
              title: res.data.info,
              icon: 'none',
            })
          }
        })
      }else if(this.properties.iid == 123) {
        let areaId = app.globalData.areaId

        getSystem("https://www.jnxsdwmsj.com/api/CountyInterface/getNewsInfo", { userId, sessionId, cityCode, token, areaId,articleId},res => {
          if (res.data.code == 0) {
            this.setData({
              listDetails: res.data.data
            })
            let datas = this.data.listDetails
            wx.navigateTo({
              url: '/pages/articleDetails/articleDetails',
              success: function (res) {
                res.eventChannel.emit('acceptDataFromOpenerPage', { data: datas })
              }
            })
          } else if (res.data.code == 1) {
            wx: showToast({
              title: res.data.info,
              icon: 'none',
            })
          }
        })
      }else if(type == 2) {
        getSystem("https://www.jnxsdwmsj.com/api/NewsInterface/getNewsInfo", { userId, sessionId, cityCode, token, articleId, type }, res => {
          if (res.data.code == 0) {
            this.setData({
              listDetails: res.data.data
            })
            let datas = this.data.listDetails
            wx.navigateTo({
              url: '/pages/articleDetails/articleDetails',
              success: function (res) {
                res.eventChannel.emit('acceptDataFromOpenerPage', { data: datas })
              }
            })
          } else if (res.data.code == 1) {
            wx: showToast({
              title: res.data.info,
              icon: 'none',
            })
          }
        })
      }else if(type == 3) {
        getSystem("https://www.jnxsdwmsj.com/api/NewsInterface/getNewsInfo", { userId, sessionId, cityCode, token, articleId, type }, res => {
          if (res.data.code == 0) {
            this.setData({
              listDetails: res.data.data
            })
            let datas = this.data.listDetails
            wx.navigateTo({
              url: '/pages/articleDetails/articleDetails',
              success: function (res) {
                res.eventChannel.emit('acceptDataFromOpenerPage', { data: datas })
              }
            })
          } else if (res.data.code == 1) {
            wx: showToast({
              title: res.data.info,
              icon: 'none',
            })
          }
        })
      }
    },
    //点击子栏目
    _sonTap(e) {
      let userId = app.globalData.userId
      let sessionId = app.globalData.sessionId
      let cityCode = app.globalData.cityCode
      let token = utilMd5.hexMD5(app.globalData.userId + app.globalData.sessionId + app.globalData.cityCode + "jiudianlianxian" + app.globalData.format)

      let columnId = 0
      if (e.currentTarget.id == 0) {
        columnId = this.properties.kc[e.currentTarget.id].columnId
        this.setData({
          currentIdx: 0
        })
      } else if (e.currentTarget.id == 1) {
        columnId = this.properties.kc[e.currentTarget.id].columnId
        this.setData({
          currentIdx: 1
        })
      } else if (e.currentTarget.id == 2) {
        columnId = this.properties.kc[e.currentTarget.id].columnId
        this.setData({
          currentIdx: 2
        })
      } else if (e.currentTarget.id == 3) {
        columnId = this.properties.kc[e.currentTarget.id].columnId
        this.setData({
          currentIdx: 3
        })
      } else if (e.currentTarget.id == 4) {
        columnId = this.properties.kc[e.currentTarget.id].columnId
        this.setData({
          currentIdx: 4
        })
      } else if (e.currentTarget.id == 5) {
        columnId = this.properties.kc[e.currentTarget.id].columnId
        this.setData({
          currentIdx: 5
        })
      }else if(e.currentTarget.id == 101) {
        columnId = this.properties.items[app.globalData.all].columnId
        this.setData({
          currentIdx: 101
        })
      }
      let areaId = app.globalData.areaId
      let pageSize = 10
      let currPage = 1

      getSystem("https://www.jnxsdwmsj.com/api/CountyInterface/getNewsList", { userId, sessionId, cityCode, token, areaId, columnId, pageSize, currPage},res => {
        if(res.data.code == 0) {
          this.setData({
            lists: res.data.data.list
          })
        }
      })
    }
  }
})
