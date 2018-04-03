//index.js
//获取应用实例
const app = getApp()

const util = require('../../utils/util.js')
const api = require('../../utils/api.js')

Page({
    data: {
        classlists: [],
        detail: {},
        swiperHeight: 0,
        swiperWidth: 0,
        current: 0,
        relaInfos: [],
        lastTimeStamp: 0,
        top: 0,
        left: 0,
        animationData: {},
        contfava: false,
        favanum: 0,
        likenum: 0,
    },
    onLoad: function (options) {
        let self = this
        wx.request({
            url: api.InfoDetail,
            data: options,
            success: (res) => {
                self.setData({
                    detail: self.dataParse(res.data[0]),
                    likenum: res.data[0].likenum,
                    favanum: res.data[0].favanum,
                })

                let id = res.data[0].id
                wx.getStorage({
                    key: id,
                    success(res){
                        self.setData({
                            contfava: true
                        })
                    },
                })
            }
        })

        wx.request({
            url: api.InfoTags,
            data: options,
            success: (res) => {
                this.setData({
                    relaInfos: res.data
                })
            }
        })

        let zanAnimate = wx.createAnimation({
            duration: 800,
            timingFunction: 'ease-in',
        })

        this.zan_animation = zanAnimate
    },
    onReady(){
        const $ = wx.createSelectorQuery()
        $.select("#swiper").boundingClientRect((res) => {
            this.setData({
                swiperWidth: res.width,
                swiperHeight: res.height,
                top: res.height/2 - 32,
                left: res.width/2 - 32
            })
        }).exec()
    },
    contFava(e){
        let id = e.target.dataset.id
        let self = this
        wx.getStorage({
            key: id,
            success(res){
                wx.showToast({
                    title: '已经喜欢过了',
                    duration: 1000
                })
            },
            fail(){
                self.increaseFavanum()
            }
        })
    },
    increaseFavanum(){
        let num = ++this.data.likenum
        let id = this.data.detail.id
        this.setData({
            contfava: true,
            likenum: num
        })

        wx.setStorageSync(id, true)

        wx.request({
            url: api.DoFava,
            data: {
                id: id,
                type: true
            },
            method: 'POST',
        })
    },
    mytap(e){
        let self = this
        let cur = e.timeStamp;
        let lastTime = self.data.lastTimeStamp
        let id = self.data.detail.id
        
        if( lastTime > 0 && cur - lastTime < 300) {
            let fava = wx.getStorageSync(id)
            if(fava) {
                wx.showToast({
                    title: '已经喜欢过了',
                    duration: 1000
                })
            }else{
                self.sayGood()
                self.increaseFavanum()
            }    
        }
        
        self.setData({lastTimeStamp: cur})
    },
    sayGood(){
        let animation = this.zan_animation
        animation.opacity(1).scale(1.5).rotateZ(-20).step()
        animation.opacity(0).step({duration:300})
        this.setData({
            animationData:animation.export()
        })
        this.goodReset() 
    },
    goodReset(){
        let animation = this.zan_animation
        setTimeout(() => {
            animation.scale(1).rotateZ(30).step()
            this.setData({
              animationData:animation.export()
            })
        }, 1000)
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
