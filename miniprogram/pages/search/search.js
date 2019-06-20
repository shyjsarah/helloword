// miniprogram/pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title
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

  },
  formSubmit: function (e) {
    var condition = e.detail.value.radio;
    var content = e.detail.value.content;
    const db = wx.cloud.database();
    var that = this;
    if(condition=='chinese'){
      db.collection('word').where({
          'chinese':content
      })
        .get({
          success: function (res) {
            if(res.data.length==0){
              wx.showToast({
                title: '未找到',
                duration: 2000
              })
            }
            console.log(res);
            that.setData({
              acronym: "缩写："+res.data[0].acronym,
              english: "英语："+res.data[0].english,
              chinese: "中文："+res.data[0].chinese,
              description:"描述："+res.data[0].description
            })
          }
        })
    }else{
      db.collection('word').where({
        'acronym': content
      })
        .get({
          success: function (res) {
            if (res.data.length == 0) {
              wx.showToast({
                title: '未找到',
                duration: 2000
              })
            }
            console.log(res);
            that.setData({
              acronym: "缩写：" + res.data[0].acronym,
              english: "英语：" + res.data[0].english,
              chinese: "中文：" + res.data[0].chinese,
              description: "描述：" + res.data[0].description
            })
          }
        })
    }
    
    console.log('form发生了submit事件，携带数据为：', e.detail.value.radio)
  },
  formReset: function () {
    var that = this;
    that.setData({
      acronym:"",
      english: "",
      chinese: "",
      description: ""
    })
    console.log('form发生了reset事件')
  }
})