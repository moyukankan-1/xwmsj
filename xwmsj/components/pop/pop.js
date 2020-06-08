// components/pop/pop.js
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
    title: String,
    type: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    popList: [{ name: "消防知识讲座" }, { name: "班主任志愿" }, { name: "理论宣讲" }, { name: "法律咨询" }, { name: "维权服务" }, { name: "心理健康" }, { name: "敬老助老" }, { name: "文化娱乐" }, { name: "全民健身" }, { name: "治安巡逻" }, { name: "治安巡逻" }, { name: "环保绿化" }, { name: "卫生保洁" }, { name: "教育培训" }, { name: "纠纷调解" }, { name: "减灾救灾" }, { name: "扶贫济困" }, { name: "科学普及" }, { name: "医疗保健" }, { name: "文明实践" }, { name: "其他" }],
    skillList: [{ name: "外语" }, { name: "书法" }, { name: "绘画" }, { name: "电脑维修" }, { name: "文化辅导" }, { name: "编辑写作" }, { name: "话剧演出" }, { name: "节目主持" }, { name: "电脑编程" }, { name: "摄影" }, { name: "漫画" }, { name: "唱歌" }, { name: "推拿按摩" }, { name: "创意策划" }, { name: "处理应变" }, { name: "社交外联" }, { name: "人事管理" }, { name: "平面设计" }],
    showPop: false,
    pop: "",
    skill: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show() {
      this.setData({
        showPop: true
      })
    },
    hide() {
      this.setData({
        showPop: false
      })
    },
    _cancel() {
      //触发取消回调
      this.triggerEvent("cancel")
    },
    _confirm() {
      app.globalData.pop = this.data.pop
      app.globalData.skill = this.data.skill
      //触发成功回调
      this.triggerEvent("confirm");
    },
    _change(e) {
      if(this.properties.type == 1) {
        this.setData({
          pop: e.detail.value.join(",")
        })
      }else if(this.properties.type == 2) {
        this.setData({
          skill: e.detail.value.join(",")
        })
      }
    }
  }
})
