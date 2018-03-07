//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        classlists: [],
        classSelected: 0,
        infoList: []
    },
    onLoad: function () {
        this.setData({
            classlists: app.globalData.classlists
        })

        wx.request({
            url: 'http://api.woyaogexing.com:8024/v3/home/newinfolist/?page_size=12&page=1',
            success: (res) => {
                this.setData({
                    infoList: res.data
                })
            }
        })
    },
    tapid: function(e) {
        let id = e.target.dataset.id;
        this.setData({
            classSelected: id
        })
        wx.showToast({
            title: id.toString(),
        })
        this.getClassData(id)
    },
    getClassData: function(classid) {
        var url;
        url = 'http://api.woyaogexing.com:8024/v3/home/classinfo/?page_size=12&page=1&classid='+classid,
        wx.request({
            url: url,
            success: (res) => {
                this.setData({
                    infoList: res.data
                })
            }
        })
    }
})
