//index.js
//获取应用实例
//var app = getApp()
Page({
  data: {
	title: '',
    page: 0,
    pageSize: 10,
    hasMoreData: true,
	tid:'',
    items: []
  },
  getArticles: function (message) {
	var that = this;  
    wx.request({
          url: 'https://chess.yaiyuan.com/jsonopeninglist/' + that.data.tid + '?page=' + that.data.page,
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
		this.getArticles('加载更多数据')
	} else {
		wx.showToast({ 
		  title: '没有更多数据',
		})
	}
  },
  onLoad: function (options) {
    //console.log('onLoad')
    var that = this; 

    that.setData({
		tid:options.tid
    })
	
	that.getArticles();
/*	
    wx.request({
          url: 'http://chess.yaiyuan.com/jsonnews/' + options.type + '?page=' + that.data.page,
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
