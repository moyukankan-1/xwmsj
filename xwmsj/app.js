//app.js 
import { format } from './utils/util.js'
App({
  onLaunch: function (options) {
  },
  globalData: {
    //用户ID
    userId: "x",
    //验证ID
    sessionId: "x",
    //城市编码
    cityCode: 1,
    //县区ID
    areaId: 0,
    //时间
    format: format(),
    //点击全部按钮显示初始界面
    all: 0,
    //活动状态
    activityStateId: -1,
    //地区
    areaId: -1,
    //服务类型
    serviceTypeId: -1,
    //服务对象
    serviceObjectId: -1,
    //认领状态
    claimStateId: -1,
    //品牌
    isBrand: -1,
    //左侧所在地区
    leftName: "",
    //右侧所在地区
    rightName: "",
    //左侧所在地区id
    leftId: 0,
    //右侧所在地区id
    rightId: 0,
    //选择服务类型
    pop: "",
    //选择个人技能
    skill: "",
    //等待申请志愿者结果
    result: 0
  }
})