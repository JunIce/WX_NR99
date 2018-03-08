//app.js
App({
    onShow: function () {
        wx.request({
            url: 'https://api.alafrase.com/v3/home/classlists/',
            success: (res) => {
                this.globalData.classlists = this.globalData.classlists.concat(res.data)
            }
        })
    },
    globalData: {
        classlists: [{classid:0, classname: '首页'}],
    }
})
