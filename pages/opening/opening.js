//index.js
//获取应用实例
//var app = getApp()
Page({
  data: {
    terms: []
  },
  reOrganizeTerms: function (terms) {
	var pterms = [];
	var subterms = {};
    for (var i = 0; i < terms.length; i++) {
      var term = terms[i] || {};
	  var ptid = term.ptid || '';
	  if( ptid == ''){
		pterms.push(term);  
	  }else{
		var temp_subterms = subterms[ptid] || [];
		temp_subterms.push(term); 
        subterms[ptid] = temp_subterms;		
	  }
    }
	
	for (var j = 0; j < pterms.length; j++) {
		var pterm = pterms[j] || {};
		var tid = pterm.tid || '';
		//var subs = subterms[tid] || [];
		pterm.subs = subterms[tid] || [];
		pterms[j] = pterm;
	}
	return pterms;
	  
  },
  onLoad: function (options) {
    //console.log('onLoad')
    var that = this; 
	
    wx.request({
          url: 'https://chess.yaiyuan.com/jsonopenings',
          method: 'GET',
          success:function(res) {
			  var termsTmp = res.data;
			  var terms = that.reOrganizeTerms(termsTmp);
			  
              that.setData({
                  terms: terms
              })
			  //console.log(that.data.terms)
          }
    })

  }
})
