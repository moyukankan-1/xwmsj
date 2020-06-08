// pages/articleDetails/articleDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //详情数据
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()

    eventChannel.on('acceptDataFromOpenerPage', (data) => {
      let str = "https://www.jnxsdwmsj.com/uploads/"
      let hei = "img style='height: 400rpx;width:100%'"
      data.data.content = data.data.content.replace(/\/uploads\//g, str)
      data.data.content = data.data.content.replace(/img /g,hei)
      this.setData({
        list: data
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