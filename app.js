//app.js

const api = require('./utils/api.js')
App({
    onLaunch: function () {
        wx.request({
            url: api.ClassLists,
            success: (res) => {
                wx.setStorage({
                    key: 'classlists',
                    data: this.globalData.classlists.concat(res.data)
                })
            }
        })
    },
    globalData: {
        classlists: [{classid:0, classname: '首页'}],
    }
})
