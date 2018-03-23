var auth = require("../../utils/auth")
var appUrl = require("../../utils/appUrl")
var states = require("../../utils/states")
var routes = require("../../pageTemplate/routes")
var m = require("mithril")
module.exports = {
    state: states.LOADING,
    channelID: "",
    route: routes.CHANNELBANS,
    object: {
        bans: []
    },
    get: function (channel) {
        this.channelID = channel
        this.state = states.LOADING
        this.route = m.route.get()
        auth.request({
            url: appUrl(`api/channel/${this.channelID}/bans`)
        }).then(response => {
            if (!!response) {
                this.object = response
            }
            this.state = states.READY
        }).catch(error => {
            if (error.Code = 401) {
                this.state = states.FORBIDDEN
            }
        })
    }
}