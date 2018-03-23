var auth = require("../../utils/auth")
var appUrl = require("../../utils/appUrl")
var states = require("../../utils/states")
var m = require("mithril")

module.exports = {
    state: states.LOADING,
    channel: "",
    get: function (channel) {
        this.state = states.LOADING
        this.route = m.route.get()
        auth.request({
            url: appUrl(`api/channel/${channel}`)
        }).then(response => {
            this.channel = response.channel
            this.channelInfo = response
            this.state = states.READY
            console.log(this)
        }).catch(error => {
            if (error.Code == 500) {
                this.state = states.FORBIDDEN
            }
        })
    }
}