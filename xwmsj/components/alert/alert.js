// components/alert/alert.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    plaTitle: String,
    value: String,
    ty: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    showAlert: false,
    is: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show() {
      this.setData({
        showAlert: true
      })
    },
    hide() {
      this.setData({
        showAlert: false
      })
    },
    _cancel() {
      //触发取消回调
      this.triggerEvent("cancel")
    },
    _confirm() {
      if(this.properties.ty == 1) {
        let is = this.data.is
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (reg.test(is) === false) {
          wx.showToast({
            title: '请输入正确的身份证号',
            icon: "none"
          })
          return false;
        } else {
          //触发成功回调
          this.triggerEvent("confirm", is);
        }
      }else if(this.properties.ty == 2) {
        let is = this.data.is
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        if (reg.test(is) === false) {
          wx.showToast({
            title: '请输入正确的邮箱',
            icon: "none"
          })
          return false;
        } else {
          //触发成功回调
          this.triggerEvent("confirm", is);
        }
      }else if(this.properties.ty == 3) {
        let is = this.data.is
        //触发成功回调
        this.triggerEvent("confirm", is);
      }else if(this.properties.ty == 4) {
        let is = this.data.is
        //触发成功回调
        this.triggerEvent("confirm", is);
      }else if(this.properties.ty == 5) {
        let is = this.data.is
        //触发成功回调
        this.triggerEvent("confirm", is);
      } else if (this.properties.ty == 6) {
        let is = this.data.is
        //触发成功回调
        this.triggerEvent("confirm", is);
      }
    },
    _cons(e) {
      this.setData({
        is: e.detail.value
      })
    }
  }
})
