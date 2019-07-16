// pages/blog/blog-detail.js

var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    blogId:"",
    blogData:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
        title: '加载中....',
        icon: 'loading'
      })
    this.setData({
      blogId: options.blogId
    });
    this.fetchData();
  },
  fetchData: function () {
    var that = this;
    wx.request({
      url: "https://www.itguliang.com/api/blog/detail?blogId=" + that.data.blogId, //小程序目前发起request请求，必须是https协议
      success: function (res) {
        that.setData({
          blogData: {
            title: res.data.title,
            content: WxParse.wxParse('content', 'html', res.data.content, that, 5)
          }
        });
        wx.hideToast();
      },
      fail: function (res) {
        wx.hideToast();
        console.log(res)
      }
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