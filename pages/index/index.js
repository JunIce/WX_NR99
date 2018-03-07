//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        classlists: [{classid:0, classname: '首页'}],
        classSelected: 0,
        infoList: []
    },
    onLoad: function () {
        wx.request({
            url: 'http://api.woyaogexing.com:8024/v3/home/classlists/',
            success: (res) => {
                this.setData({
                    classlists: this.data.classlists.concat(res.data)
                })
            }
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
    },
    getClassData: function(classid) {
        wx.request({
            url: 'http://api.woyaogexing.com:8024/v3/home/newinfolist/?page_size=12&page=1',
            success: (res) => {
                this.setData({
                    infoList: res.data
                })
            }
        })
    }
})
