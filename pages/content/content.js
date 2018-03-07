//index.js
//获取应用实例
const app = getApp()

const util = require('../../utils/util.js');

Page({
    data: {
        classlists: [],
        detail: {}
    },
    onLoad: function (options) {

        this.setData({
            classlists: app.globalData.classlists
        })

        wx.request({
            url:'http://api.woyaogexing.com:8024/v3/home/infodetail',
            data: options,
            success: (res) => {
                this.setData({
                    detail: this.dataParse(res.data[0])
                })
            }
        })
    },
    dataParse: function(obj) {
        //set titile

        wx.setNavigationBarTitle({
            title: obj.title
        })

        // parse imgs
        var b = obj.comm_imgs.split('###');
        b.splice(0,1)
        obj.imgs = b;

        // parse html
        obj.appraise = util.convertHtmlToText(obj.appraise);

        // parse newstime
        obj.newstime = util.formatTime(obj.newstime)
        return obj
    },

})
