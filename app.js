//app.js
App({
  onLaunch: function () {
      wx.request({
          url: 'http://api.woyaogexing.com:8024/v3/home/classlists/',
          success: (res) => {
              this.globalData.classlists = this.globalData.classlists.concat(res.data)
          }
      })
  },
  globalData: {
    classlists: [{classid:0, classname: '首页'}],
  }
})
