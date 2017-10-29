//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
        inputShowed: false,
        inputVal: ""
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
      this.setData({
        inputVal: e.detail.value
      });
	  //console.log(e.detail.value)
    }, 	
    search: function () {
      wx.navigateTo({
        url: '/pages/search/search?keys=' + this.data.inputVal
      })
    },	
  onLoad: function () {
    console.log('onLoad')
    var that = this
	/*
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
	*/
  }
})
