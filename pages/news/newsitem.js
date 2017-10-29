//index.js
//获取应用实例
//var app = getApp()
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    node: {}
  },

  onLoad: function (options) {
    //console.log('onLoad')
    var that = this
    wx.request({
          url: 'https://chess.yaiyuan.com/jsonnewsitem/' + options.nid,
          method: 'GET',
          success:function(res) {
			  
              that.setData({
                  node: res.data[0]
              })
			  //console.log(res.data[0])
		      var article =  res.data[0].body;
		      WxParse.wxParse('article', 'html', article, that, 5);			  
          }


    })	
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
