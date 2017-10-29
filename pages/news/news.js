//index.js
//获取应用实例
//var app = getApp()
Page({
  data: {
	title: '',
    page: 0,
    pageSize: 10,
    hasMoreData: true,
	type:'',
    items: []
  },
  getArticles: function (message) {
	var that = this;  
    wx.request({
          url: 'https://chess.yaiyuan.com/jsonnews/' + that.data.type + '?page=' + that.data.page,
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
    console.log('onLoad')
    var that = this; 
	var type = options.type;
	var title = "";
	if(type == 1){
		title = '象棋动态';
	}
	if(type == 2){
		title = '象棋赛事';
	}
	if(type == 3){
		title = '象棋典故';
	}
    that.setData({
        title: title,
		type:type
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
