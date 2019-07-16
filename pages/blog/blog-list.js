// pages/blog/blog-list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    blogList:[],
    pageIndex: 1,
    loading:false,
    loadMore:true,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showToast({
      title: '加载中....',
      icon: 'loading'
    })
    var that = this;
    that.fetchData(1);
  },
  fetchData: function(pageIndex) {
    var that = this;
    var blogListData =pageIndex==1?[]:this.data.blogList;
    wx.request({
      url: "https://www.itguliang.com/api/blog/pageList?page=" + pageIndex+"&pageSize=15", //小程序目前发起request请求，必须是https协议
      success: function(res) {
        that.setData({
          loading: false
        })
        if (res.data.data.length<15){
          that.setData({
            loadMore: false
          })
        }
        that.setData({
          blogList: blogListData.concat(res.data.data)
        })
        wx.hideToast();
        wx.stopPullDownRefresh();
      },
      fail: function(res) {
        wx.hideToast();
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      loading: false,
      pageIndex: 1
    })
    this.fetchData(this.data.pageIndex);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.loadMore){
      this.setData({
        loading: true,
        pageIndex: this.data.pageIndex + 1
      })
      this.fetchData(this.data.pageIndex);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})