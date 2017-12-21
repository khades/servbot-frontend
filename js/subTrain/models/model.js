var auth = require("../../utils/auth")
var appUrl = require("../../utils/appUrl")
var states = require("../../utils/states")
var routes = require("../../pageTemplate/routes")
var m = require("mithril")
module.exports = {
    state: states.READY,
    channelID: "",
    route: routes.SUBTRAIN,
    object: {

    },
    save: function () {
        this.state = states.LOADING
        auth.request({
            method: "POST",
            data: this.object,
            url: appUrl(`/api/channel/${this.channelID}/subtrain`)
        }).then(response => {
            this.get(this.channelID)
            this.state = states.READY
        }).catch(error => {
            this.state = states.READY
        })
    },
    get: function (channel) {
        this.channelID = channel
        this.state = states.LOADING
        this.route = m.route.get()
        auth.request({
            url: appUrl(`api/channel/${this.channelID}/subtrain`)
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