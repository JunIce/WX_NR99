Component({
    properties: {
        info: {
            type: Object
        }
    },
    data: {
        src: 'http://img.nr99.com/2017/04/24/02dcb61a681d54ac_300x260.jpg',
        text: '性价比超高的Charles&Keith绑带侧镂空高跟鞋~粉 最近看到好多小CK的推荐',
        userpic: 'http://img.nr99.com/2015/11/06/48b69ff598d163f1_36x36.jpg',
        username: '撒地方哈说',
        newstime: '1520389171',
        num: 8
    },
    methods: {
        labeltap: function() {
            console.log('label被点击了一下！')
        }
    }
})
