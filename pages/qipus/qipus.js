//index.js
//获取应用实例
//var app = getApp()
Page({
  data: {
    page: 0,
    pageSize: 10,
    hasMoreData: true,		  
    items: []
  },
  getItems: function () {
	var that = this;  
    wx.request({
          url: 'https://chess.yaiyuan.com/jsonqipus' + '?page=' + that.data.page,
          method: 'GET',
          success:function(res) {
			  var nodelist = res.data
			  var itemsTem = that.data.items

			  if (nodelist.length < that.data.pageSize) {
				that.setData({
				  hasMoreData: false,
                  items: itemsTem.concat(nodelist)
                })
			  }else{
				that.setData({
				  hasMoreData: true,
				  page: that.data.page + 1,
                  items: itemsTem.concat(nodelist)
                })				  
			  }

			  //console.log(that.data.items)
          }
    })	 
  },
  onReachBottom: function() {
    // Do something when page reach bottom.
	//this.getArticles();
	if (this.data.hasMoreData) {
		this.getItems()
	} else {
		wx.showToast({ 
		  title: '没有更多数据',
		})
	}
  },
  onLoad: function () {
    //console.log('onLoad')
    //var that = this
	this.getItems()
	/*
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
	*/
	/*
    var that = this; 
    wx.request({
          url: 'http://chess.yaiyuan.com/jsonqipus',
          method: 'GET',
          success:function(res) {
              that.setData({
                  items: res.data
              })
			  console.log(that.data.items)
          }
    })
    */	
  }
})
