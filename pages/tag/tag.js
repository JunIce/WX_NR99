//index.js
//获取应用实例
const app = getApp()
const api = require('../../utils/api.js')

Page({
    data: {
        tagname: '',
        tagid: 0,
        infoList: [],
        page: 1,
        page_size: 12,
    },
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: options.tagname
        })
        this.setData({
            tagname: options.tagname,
            tagid: options.tagid
        })
        this.getClassData()
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
        let page = this.data.page
        let tagid = this.data.tagid
        let page_size = this.data.page_size

        wx.request({
            url: api.TagsList,
            data:{
                tagid: tagid,
                page_size: page_size,
                page: page
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
