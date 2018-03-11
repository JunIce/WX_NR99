//index.js
//获取应用实例
const app = getApp()

const util = require('../../utils/util.js');

Page({
    data: {
        classlists: [],
        detail: {},
        imgHeight: '',
        imgWidth: '',
        imgHeightsArray: [],
        current: 0,
        relaInfos: []
    },
    onLoad: function (options) {

        this.setData({
            imgWidth: wx.getSystemInfoSync().windowWidth
        })

        wx.request({
            url:'https://api.alafrase.com/v3/home/infodetail',
            data: options,
            success: (res) => {
                this.setData({
                    detail: this.dataParse(res.data[0])
                })
            }
        })

        wx.request({
            url:'https://api.alafrase.com/v3/home/get-by-info-type/',
            data: options,
            success: (res) => {
                this.setData({
                    relaInfos: res.data
                })
            }
        })
    },
    dataParse: function(obj) {
        //set titile

        wx.setNavigationBarTitle({
            title: obj.title.substr(0,10)
        })

        // parse imgs
        var b = obj.comm_imgs.split('###');
        var imgs = [];
        b.map(i => {
            if(i == '') return;
            i = i.replace(/_300x260/, '_600x600');
            imgs.push(i)
        })
        obj.imgs = imgs;

        // parse html
        obj.appraise = util.convertHtmlToText(obj.appraise);

        // parse newstime
        obj.newstime = util.formatTime(obj.newstime)
        return obj
    },

})
