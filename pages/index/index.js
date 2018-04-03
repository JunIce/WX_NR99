//index.js
//获取应用实例
const app = getApp()
const api = require('../../utils/api.js')

Page({
    data: {
        classlists: [],
        classSelected: 0,
        infoList: [],
        page: 1,
    },
    onLoad: function () {
        try {
            var data = wx.getStorageSync('classlists')
            if (data) {
                this.setData({
                    classlists: data
                })
            }
        } catch (e) {
            wx.request({
                url: api.ClassLists,
                success: (res) => {
                    this.setData({
                        classlists: res.data
                    })
                }
            })
        }
        
        wx.request({
            url: api.NewInfoList,
            data:{
                page_size: 12,
                page: 1
            },
            success: (res) => {
                this.setData({
                    infoList: this.data.infoList.concat(res.data)
                })
            }
        })
    },
    tapid: function(e) {
        let id = e.target.dataset.id;
        this.setData({
            classSelected: id,
            page: 1,
            infoList: []
        })

        this.loadingData()
    },
    loadingData(){
        let classid = this.data.classSelected
        wx.showLoading({
            title: '努力加载中......',
            success: () =>{
                this.getClassData(classid)
            }
        })
    },
    getClassData: function(classid) {
        let url = classid == 0 ? api.NewInfoList : api.ClassListInfo
        let page = this.data.page
        wx.request({
            url: url,
            data: {
                page_size: 12,
                page: page,
                classid: classid
            },
            success: (res) => {
                wx.hideLoading()
                this.setData({
                    infoList: this.data.infoList.concat(res.data)
                })
            },
            fail: () => {
                wx.hideLoading()
                wx.showToast({
                    title: '网络错误',
                    duration: 2000
                })
            }
        })
    },
    scrollDown(){
        let page = this.data.page
        this.setData({
            page: ++page
        })
        this.loadingData()
    }
})
