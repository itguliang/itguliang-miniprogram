// pages/blog/blog-detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blogId:"",
    blogData:{
      title:"",
      content:""
    }
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
        //将markdown内容转换为towxml数据
        let data = app.towxml.toJson(
          res.data.content,               // `markdown`或`html`文本内容
          'markdown'              // `markdown`或`html`
        );

        //前台初始化小程序数据（2.1.2新增，如果小程序中无相对资源需要添加`base`根地址，也无`audio`内容可无需初始化）
        data = app.towxml.initData(data, {
          base: 'https://itguliang.com/',    // 需要解析的内容中相对路径的资源`base`地址
          app: that                     // 传入小程序页面的`this`对象，以用于音频播放器初始化
        });

        that.setData({
          blogData: {
            title: res.data.title,
            content: data
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