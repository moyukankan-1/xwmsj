// components/articleList/articleList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: {
      type: Array,
      value: []
    },
    scrollY: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _setCurrentIdx(index) {
      this.setData({
        currentIndex: index
      })
    },

    _handlerTap(evt) {
      this.setData({
        currentIndex: evt.currentTarget.id
      })

      this.triggerEvent("selectChange", { currentIdx: evt.currentTarget.id }, {})
    }
  }
})
