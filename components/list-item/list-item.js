Component({
    properties: {
        info: {
            type: Object
        }
    },
    data: {

    },
    methods: {

        tpage: function(e) {
            let id = e.currentTarget.dataset.id;
            let ttid= e.currentTarget.dataset.ttid;
            let url;
            url = '/pages/content/content?id='+ id + '&ttid=' + ttid;
            wx.navigateTo({
              url: url
            })
        }
    }
})
