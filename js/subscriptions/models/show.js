var auth = require("../../utils/auth")
var appUrl = require("../../utils/appUrl")
var states = require("../../utils/states")
var m = require("mithril")

module.exports = {
    state: states.LOADING,
    channel: "",
    subscriptions: [],
    get: function (channelID) {
        this.route = m.route.get()
        auth.request({
            url: appUrl(`api/channel/${channelID}/subs`)
        }).then(response => {
            if (!!response) {
                if (!!response.subscriptions) {
                    this.subscriptions = response.subscriptions.sort((a, b) => { 
                        if (new Date(a).getDate() - new Date(b).getDate() < 0) {
                            return -1
                        } else {
                            return 1
                        }
                    })
                } else {
                    this.subscriptions = []
                }
                this.channel = response.channel
            }
            this.state = states.READY
        })
    },

}